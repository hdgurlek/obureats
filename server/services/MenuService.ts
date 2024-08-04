import {Menu, MenuCategory, MenuItem} from '../api/types/response/Menu'
import Categories from '../models/Categories'
import Items, {ItemModel} from '../models/Items'

export async function getRestaurantMenu(slug: string): Promise<Menu> {
	const categories = await Categories.find({slug: slug})
		.populate<{items: ItemModel[]}>({path: 'items', select: '-_id -__v'})
		.select('-_id -__v -sequence')
		.sort({sequence: 1})
		.exec()

	const menuCategories = categories.map(category => {
		const items = category.items.sort(bySequence).map(item => convertToMenuItem(item))
		return {name: category.name, items: items} as MenuCategory
	})

	return {categories: menuCategories}
}

export async function getRestaurantMenuItem(restaurantSlug: string, uuid: string): Promise<MenuItem> {
	const item = await Items.findOne({restaurantSlug: restaurantSlug, uuid: uuid}).exec()
	return convertToMenuItem(item)
}

const bySequence = (a: any, b: any) => a.sequence - b.sequence

function convertToMenuItem(item: ItemModel): MenuItem {
	return {
		name: item.name,
		image: item.image,
		detail: item.detail,
		price: item.price,
		rating: item.rating,
		uuid: item.uuid,
	} as MenuItem
}
