import {getRestaurantMenu, getRestaurantMenuItem} from '../services/MenuService'
import {getRestaurant, getRestaurants} from '../services/RestaurantService'
import catchErrors from '../utils/catchErrors'
import {z} from 'zod'

const restaurantSlugParamsSchema = z.object({
	slug: z.string().min(1),
})

const menuItemParamsSchema = z.object({
	slug: z.string().min(1),
	uuid: z.string().min(1),
})

export const getRestaurantsHandler = catchErrors(async (req, res) => {
	const restaurants = await getRestaurants()
	res.send(restaurants)
})

export const getRestaurantHandler = catchErrors(async (req, res) => {
	const {slug} = restaurantSlugParamsSchema.parse(req.params)
	const restaurant = await getRestaurant(slug)
	res.send(restaurant)
})

export const getRestaurantMenuHandler = catchErrors(async (req, res) => {
	const {slug} = restaurantSlugParamsSchema.parse(req.params)
	const menu = await getRestaurantMenu(slug)
	res.send(menu)
})

export const getMenuItemHandler = catchErrors(async (req, res) => {
	const {slug, uuid} = menuItemParamsSchema.parse(req.params)
	const item = await getRestaurantMenuItem(slug, uuid)
	res.send(item)
})
