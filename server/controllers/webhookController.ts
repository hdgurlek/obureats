import {Request, Response} from 'express'
import Stripe from 'stripe'
import Orders from '../models/Orders'
import CartItems from '../models/CartItems'
import Carts from '../models/Carts'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {})

export const stripeWebhookHandler = async (req: Request, res: Response) => {
	const sig = req.headers['stripe-signature']!
	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
	} catch (err: any) {
		return res.status(400).send(`Webhook error: ${err.message}`)
	}

	const paymentIntent = event.data.object as Stripe.PaymentIntent
	console.log('Received event:', event.type, 'for PaymentIntent ID:', paymentIntent.id)
	switch (event.type) {
		case 'payment_intent.succeeded':
			console.log('Payment succeeded for intent:', paymentIntent.id)
			const paidOrder = await Orders.findOneAndUpdate(
				{paymentIntentId: paymentIntent.id},
				{status: 'PAID'},
				{new: true}
			)
			if (!paidOrder) {
				console.warn(`No order found for succeeded PaymentIntent ${paymentIntent.id}`)
				break
			}

			const cart = await Carts.findOne({userId: paidOrder.userId}).exec()
			if (cart) {
				await CartItems.deleteMany({cart: cart._id}).exec()
				await Carts.deleteOne({_id: cart._id}).exec()
			}
			break
		case 'payment_intent.payment_failed':
			console.log('Payment failed for intent:', paymentIntent.id)
			const failedOrder = await Orders.findOneAndUpdate(
				{paymentIntentId: paymentIntent.id},
				{status: 'FAILED'},
				{new: true}
			)
			if (!failedOrder) {
				console.warn(`No order found for failed PaymentIntent ${paymentIntent.id}`)
			}
			break
		case 'payment_intent.canceled':
			console.log('Payment canceled for intent:', paymentIntent.id)
			const canceledOrder = await Orders.findOneAndUpdate(
				{paymentIntentId: paymentIntent.id},
				{status: 'CANCELED'},
				{new: true}
			)
			if (!canceledOrder) {
				console.warn(`No order found for canceled PaymentIntent ${paymentIntent.id}`)
			}
			break
	}

	res.json({received: true})
}
