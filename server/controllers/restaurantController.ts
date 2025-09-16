import {getRestaurantMenu, getRestaurantMenuItem} from '../services/MenuService'
import {getRestaurant, getRestaurants} from '../services/RestaurantService'
import catchErrors from '../utils/catchErrors'

export const getRestaurantsHandler = catchErrors(async (req, res) => {
	const restaurants = await getRestaurants()
	res.send(restaurants)
})

export const getRestaurantHandler = catchErrors(async (req, res) => {
	const slug = req.params.slug
	const restaurant = await getRestaurant(slug)
	res.send(restaurant)
})

export const getRestaurantMenuHandler = catchErrors(async (req, res) => {
	const slug = req.params.slug
	const menu = await getRestaurantMenu(slug)
	res.send(menu)
})

export const getMenuItemHandler = catchErrors(async (req, res) => {
	const slug = req.params.slug
	const uuid = req.params.uuid
	const item = await getRestaurantMenuItem(slug, uuid)
	res.send(item)
})
