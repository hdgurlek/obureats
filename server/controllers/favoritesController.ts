import {BAD_REQUEST, CREATED, NOT_FOUND, OK} from '../constants/http'
import FavoriteRestaurant from '../models/FavoriteRestaurant'
import Restaurants from '../models/Restaurants'
import catchErrors from '../utils/catchErrors'
import {z} from 'zod'

const slugParamsSchema = z.object({
	slug: z.string().min(1),
})

export const getFavoritesHandler = catchErrors(async (req, res) => {
	const userId = req.userId

	const favorites = await FavoriteRestaurant.find({userId}).sort({createdAt: -1}).lean()
	const slugs = favorites.map((fav) => fav.restaurantSlug)

	if (slugs.length === 0) {
		return res.status(OK).json({restaurants: []})
	}

	const restaurants = await Restaurants.find({slug: {$in: slugs}}).lean()
	const restaurantBySlug = new Map(restaurants.map((restaurant) => [restaurant.slug, restaurant]))

	// Preserve favorite ordering while filtering out missing restaurants.
	const result = slugs
		.map((slug) => restaurantBySlug.get(slug))
		.filter(Boolean)
		.map((restaurant: any) => ({
			name: restaurant.name,
			slug: restaurant.slug,
			rating: restaurant.rating,
			favorite: true,
			image: restaurant.image,
			deliveryTime: restaurant.deliveryTime,
		}))

	return res.status(OK).json({restaurants: result})
})

export const addFavoriteHandler = catchErrors(async (req, res) => {
	const userId = req.userId
	const {slug} = slugParamsSchema.parse(req.params)

	const exists = await Restaurants.exists({slug})
	if (!exists) {
		return res.status(NOT_FOUND).json({error: 'Restaurant not found'})
	}

	try {
		await FavoriteRestaurant.create({userId, restaurantSlug: slug})
	} catch (err: any) {
		// Duplicate favorite is treated as success (idempotent).
		if (err?.code !== 11000) throw err
	}

	return res.sendStatus(CREATED)
})

export const removeFavoriteHandler = catchErrors(async (req, res) => {
	const userId = req.userId
	const {slug} = slugParamsSchema.parse(req.params)

	const result = await FavoriteRestaurant.deleteOne({userId, restaurantSlug: slug})
	if (result.deletedCount === 0) {
		return res.status(BAD_REQUEST).json({error: 'Favorite not found'})
	}

	return res.sendStatus(OK)
})

