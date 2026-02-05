import Orders from '../models/Orders'
import {CONFLICT, OK} from '../constants/http'
import {addItemToCart, getCart, updateItemInCart} from '../services/CartService'
import catchErrors from '../utils/catchErrors'
import {cancelPaymentIntent, getStatus, updatePaymentIntent} from '../services/PaymentService'

export const getCartHandler = catchErrors(async (req, res) => {
	const cart = await getCart(req.userId)
	return res.status(OK).json(cart)
})

export const addCartHandler = catchErrors(async (req, res) => {
	const {itemUuid, quantity} = req.body
	const userId = req.userId

	const pendingOrder = await Orders.findOne({userId, status: 'PENDING'})
	if (pendingOrder?.paymentIntentId) {
		const {status} = await getStatus(pendingOrder.paymentIntentId)
		if (status === 'processing') {
			return res.status(CONFLICT).json({error: 'Payment is processing. Cart changes are disabled.'})
		}
	}

	await addItemToCart(itemUuid, quantity, userId)

	const cart = await getCart(userId)
	const totalPrice = cart.totalPrice ?? 0

	if (pendingOrder && pendingOrder.paymentIntentId && totalPrice === 0) {
		try {
			await cancelPaymentIntent(pendingOrder.paymentIntentId)
			pendingOrder.items = cart.items
			pendingOrder.totalPrice = totalPrice
			pendingOrder.status = 'CANCELED'
			await pendingOrder.save()
		} catch (err: any) {
			console.warn(`Failed to cancel PaymentIntent ${pendingOrder.paymentIntentId}:`, err?.message ?? err)
		}
		return res.sendStatus(OK)
	}

	if (pendingOrder && pendingOrder.paymentIntentId && totalPrice > 0) {
		try {
			await updatePaymentIntent(pendingOrder.paymentIntentId, {
				amount: totalPrice,
				metadata: {
					...(cart.restaurantSlug && {restaurantSlug: cart.restaurantSlug}),
					updatedAt: new Date().toISOString(),
				},
			})

			pendingOrder.items = cart.items
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

	const pendingOrder = await Orders.findOne({userId, status: 'PENDING'})
	if (pendingOrder?.paymentIntentId) {
		const {status} = await getStatus(pendingOrder.paymentIntentId)
		if (status === 'processing') {
			return res.status(CONFLICT).json({error: 'Payment is processing. Cart changes are disabled.'})
		}
	}

	await updateItemInCart(itemUuid, quantity, userId)

	const cart = await getCart(userId)
	const totalPrice = cart.totalPrice ?? 0

	if (pendingOrder && pendingOrder.paymentIntentId && totalPrice === 0) {
		try {
			await cancelPaymentIntent(pendingOrder.paymentIntentId)
			pendingOrder.items = cart.items
			pendingOrder.totalPrice = totalPrice
			pendingOrder.status = 'CANCELED'
			await pendingOrder.save()
		} catch (err: any) {
			console.warn(`Failed to cancel PaymentIntent ${pendingOrder.paymentIntentId}:`, err?.message ?? err)
		}
		return res.sendStatus(OK)
	}

	if (pendingOrder && pendingOrder.paymentIntentId && totalPrice > 0) {
		try {
			await updatePaymentIntent(pendingOrder.paymentIntentId, {
				amount: totalPrice,
				metadata: {
					...(cart.restaurantSlug && {restaurantSlug: cart.restaurantSlug}),
					updatedAt: new Date().toISOString(),
				},
			})

			pendingOrder.items = cart.items
			pendingOrder.totalPrice = totalPrice
			await pendingOrder.save()
		} catch (err: any) {
			console.warn(`Failed to update PaymentIntent ${pendingOrder.paymentIntentId}:`, err?.message ?? err)
		}
	}

	res.sendStatus(OK)
})
