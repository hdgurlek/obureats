import {getRestaurantMenu, getRestaurantMenuItem} from '../services/MenuService'
import catchErrors from '../utils/catchErrors'
import {z} from 'zod'
import Restaurants from '../models/Restaurants'
import FavoriteRestaurant from '../models/FavoriteRestaurant'

const restaurantSlugParamsSchema = z.object({
	slug: z.string().min(1),
})

const menuItemParamsSchema = z.object({
	slug: z.string().min(1),
	uuid: z.string().min(1),
})

const toRestaurantResponse = (restaurant: any, isFavorite: boolean) => ({
	name: restaurant.name,
	slug: restaurant.slug,
	rating: restaurant.rating,
	favorite: isFavorite,
	image: restaurant.image,
	deliveryTime: restaurant.deliveryTime,
})

export const getRestaurantsHandler = catchErrors(async (req, res) => {
	const restaurants = await Restaurants.find().lean()

	const userId = (req as any).userId
	if (!userId) {
		return res.send(restaurants.map((r) => toRestaurantResponse(r, false)))
	}

	const favorites = await FavoriteRestaurant.find({userId}).select({restaurantSlug: 1, _id: 0}).lean()
	const favoriteSlugs = new Set(favorites.map((f) => f.restaurantSlug))

	return res.send(restaurants.map((r) => toRestaurantResponse(r, favoriteSlugs.has(r.slug))))
})

export const getRestaurantHandler = catchErrors(async (req, res) => {
	const {slug} = restaurantSlugParamsSchema.parse(req.params)
	const restaurant = await Restaurants.findOne({slug}).orFail().lean()

	const userId = (req as any).userId
	if (!userId) {
		return res.send(toRestaurantResponse(restaurant, false))
	}

	const isFavorite = Boolean(await FavoriteRestaurant.exists({userId, restaurantSlug: slug}))
	return res.send(toRestaurantResponse(restaurant, isFavorite))
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
