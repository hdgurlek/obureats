import {OK} from '../constants/http'
import Orders from '../models/Orders'
import Restaurants from '../models/Restaurants'
import catchErrors from '../utils/catchErrors'

const ORDER_HISTORY_LIMIT = 30

export const getOrderHistoryHandler = catchErrors(async (req, res) => {
	const userId = req.userId

	const orders = await Orders.find({userId, status: 'PAID'})
		.sort({createdAt: -1})
		.limit(ORDER_HISTORY_LIMIT)
		.lean()

	const restaurantSlugs = [...new Set(orders.map((order) => order.restaurantSlug))]
	const restaurants = await Restaurants.find({slug: {$in: restaurantSlugs}}, {slug: 1, name: 1, image: 1, _id: 0}).lean()
	const restaurantsBySlug = new Map(restaurants.map((restaurant) => [restaurant.slug, restaurant]))

	return res.status(OK).json({
		orders: orders.map((order) => ({
			id: String(order._id),
			items: order.items,
			totalPrice: order.totalPrice,
			restaurantSlug: order.restaurantSlug,
			restaurantName: restaurantsBySlug.get(order.restaurantSlug)?.name ?? order.restaurantSlug,
			restaurantImage: restaurantsBySlug.get(order.restaurantSlug)?.image ?? null,
			createdAt: order.createdAt,
			paymentStatus: order.status,
		})),
	})
})
