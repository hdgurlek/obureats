import Category from '../models/Category'
require('../models/Item')

export async function getRestaurantMenu(slug: string) {
	const categories = await Category.find({slug: slug})
		.populate({path: 'items', select: '-_id -__v'})
		.select('-_id -__v -sequence')
		.sort({sequence: 1})
		.exec()

	return categories
}
