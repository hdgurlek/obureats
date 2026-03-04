import {BAD_REQUEST, INTERNAL_SERVER_ERROR, OK} from '../constants/http'
import Orders from '../models/Orders'
import {getCart} from '../services/CartService'
import {createPaymentIntent} from '../services/PaymentService'
import catchErrors from '../utils/catchErrors'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {})
const PROCESSING_TIMEOUT_SECONDS = 5 * 60

export const checkoutHandler = catchErrors(async (req, res) => {
	const userId = req.userId
	if (!userId) {
		return res.status(BAD_REQUEST).json({error: 'User not authenticated'})
	}

	const cart = await getCart(userId)

	if (!cart || cart.items.length === 0) {
		throw new Error('Cart is empty')
	}
	if (!cart.totalPrice || cart.totalPrice <= 0) {
		throw new Error('Cart total price is undefined or invalid')
	}

	let order = await Orders.findOne({userId, status: 'PENDING'})

	async function respondWith(order: any, clientSecret: string) {
		return res.status(OK).json({
			clientSecret,
			order: {
				id: order._id,
				items: order.items,
				totalPrice: order.totalPrice,
			},
		})
	}

	// If no pending order, create a new one
	if (!order) {
		const pi = await createPaymentIntent(cart.totalPrice, {
			metadata: {userId, restaurantSlug: cart.restaurantSlug},
		})

		if (!pi?.client_secret) {
			return res.status(INTERNAL_SERVER_ERROR).json({error: 'Failed to create payment intent'})
		}

		try {
			order = await Orders.create({
				restaurantSlug: cart.restaurantSlug,
				userId,
				items: cart.items,
				totalPrice: cart.totalPrice,
				paymentIntentId: pi.id,
				status: 'PENDING',
			})
		} catch (err: any) {
			if (err?.code === 11000) {
				try {
					await stripe.paymentIntents.cancel(pi.id)
				} catch (cancelErr: any) {
					console.warn(`Failed to cancel duplicate PaymentIntent ${pi.id}:`, cancelErr?.message ?? cancelErr)
				}

				const existingOrder = await Orders.findOne({userId, status: 'PENDING'})
				if (existingOrder) {
					const existingPI = await stripe.paymentIntents.retrieve(existingOrder.paymentIntentId)
					if (!existingPI.client_secret) {
						return res.status(INTERNAL_SERVER_ERROR).json({error: 'Failed to fetch existing payment intent'})
					}
					return respondWith(existingOrder, existingPI.client_secret)
				}
			}
			throw err
		}

		return respondWith(order, pi.client_secret)
	}

	// Existing order: fetch PI
	const pi = await stripe.paymentIntents.retrieve(order.paymentIntentId)

	// If PI is processing for too long, cancel and create a fresh one
	if (pi.status === 'processing') {
		const nowSeconds = Math.floor(Date.now() / 1000)
		const ageSeconds = nowSeconds - (pi.created ?? nowSeconds)
		if (ageSeconds > PROCESSING_TIMEOUT_SECONDS) {
			try {
				await stripe.paymentIntents.cancel(pi.id)
			} catch (err: any) {
				console.warn(`Failed to cancel stale PaymentIntent ${pi.id}:`, err?.message ?? err)
				return res.status(INTERNAL_SERVER_ERROR).json({error: 'Failed to reset processing payment'})
			}

			const newPI = await createPaymentIntent(cart.totalPrice, {
				metadata: {userId, restaurantSlug: cart.restaurantSlug},
			})

			order.paymentIntentId = newPI.id
			await order.save()

			return respondWith(order, newPI.client_secret!)
		}

		return respondWith(order, pi.client_secret!)
	}

	// If PI not usable → create a fresh one
	if (['succeeded', 'canceled'].includes(pi.status)) {
		const newPI = await createPaymentIntent(cart.totalPrice, {
			metadata: {userId, restaurantSlug: cart.restaurantSlug},
		})

		order.paymentIntentId = newPI.id
		await order.save()

		return respondWith(order, newPI.client_secret!)
	}

	// Return current PI
	return respondWith(order, pi.client_secret!)
})
