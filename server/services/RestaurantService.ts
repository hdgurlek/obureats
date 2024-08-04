import {Restaurant} from '../api/types/response/Restaurant'
import Restaurants, {RestaurantModel} from '../models/Restaurants'

export async function getRestaurants(): Promise<Restaurant[]> {
	const restaurants = await Restaurants.find()
	return restaurants.map(restaurant => convertToRestaurant(restaurant))
}

export async function getRestaurant(slug: string): Promise<Restaurant> {
	const model = await Restaurants.findOne({slug: slug})
	return convertToRestaurant(model)
}

function convertToRestaurant(model: RestaurantModel): Restaurant {
	return {
		name: model.name,
		slug: model.slug,
		rating: model.rating,
		favorite: model.favorite,
		image: model.image,
		deliveryTime: model.deliveryTime,
	}
}
