import Orders from '../models/Orders'
import {OK} from '../constants/http'
import {addItemToCart, getCart, updateItemInCart} from '../services/CartService'
import catchErrors from '../utils/catchErrors'
import {updatePaymentIntent} from '../services/PaymentService'

export const getCartHandler = catchErrors(async (req, res) => {
	const cart = await getCart(req.userId)
	return res.status(OK).json(cart)
})

export const addCartHandler = catchErrors(async (req, res) => {
	const {itemUuid, quantity} = req.body
	const userId = req.userId

	await addItemToCart(itemUuid, quantity, userId)

	const cart = await getCart(userId)
	const totalPrice = cart.totalPrice ?? 0

	const pendingOrder = await Orders.findOne({userId, status: 'PENDING'})

	if (pendingOrder && pendingOrder.paymentIntentId && totalPrice > 0) {
		try {
			await updatePaymentIntent(pendingOrder.paymentIntentId, {
				amount: totalPrice,
				metadata: {
					...(cart.restaurantSlug && {restaurantSlug: cart.restaurantSlug}),
					updatedAt: new Date().toISOString(),
				},
			})

			pendingOrder.totalPrice = totalPrice
			await pendingOrder.save()
		} catch (err: any) {
			console.warn(`Failed to update PaymentIntent ${pendingOrder.paymentIntentId}:`, err?.message ?? err)
		}
	}

	res.sendStatus(OK)
})

export const updateCartHandler = catchErrors(async (req, res) => {
	const {itemUuid, quantity} = req.body
	const userId = req.userId

	await updateItemInCart(itemUuid, quantity, userId)

	const cart = await getCart(userId)
	const totalPrice = cart.totalPrice ?? 0

	const pendingOrder = await Orders.findOne({userId, status: 'PENDING'})

	if (pendingOrder && pendingOrder.paymentIntentId && totalPrice > 0) {
		try {
			await updatePaymentIntent(pendingOrder.paymentIntentId, {
				amount: totalPrice,
				metadata: {
					...(cart.restaurantSlug && {restaurantSlug: cart.restaurantSlug}),
					updatedAt: new Date().toISOString(),
				},
			})

			pendingOrder.totalPrice = totalPrice
			await pendingOrder.save()
		} catch (err: any) {
			console.warn(`Failed to update PaymentIntent ${pendingOrder.paymentIntentId}:`, err?.message ?? err)
		}
	}

	res.sendStatus(OK)
})
