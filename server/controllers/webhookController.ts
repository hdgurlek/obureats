import {Request, Response} from 'express'
import Stripe from 'stripe'
import Orders from '../models/Orders'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2025-09-30.clover',
})

export const stripeWebhookHandler = async (req: Request, res: Response) => {
	console.log('Webhook received:', req.body)
	const sig = req.headers['stripe-signature']!
	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
	} catch (err: any) {
		return res.status(400).send(`Webhook error: ${err.message}`)
	}

	const paymentIntent = event.data.object as Stripe.PaymentIntent

	switch (event.type) {
		case 'payment_intent.succeeded':
			await Orders.findOneAndUpdate({paymentIntentId: paymentIntent.id}, {status: 'PAID'})
			break
		case 'payment_intent.payment_failed':
			await Orders.findOneAndUpdate({paymentIntentId: paymentIntent.id}, {status: 'FAILED'})
			break
		case 'payment_intent.canceled':
			await Orders.findOneAndUpdate({paymentIntentId: paymentIntent.id}, {status: 'CANCELED'})
			break
	}

	res.json({received: true})
}
