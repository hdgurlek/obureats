import {Request, Response} from 'express'
import Stripe from 'stripe'
import Orders from '../models/Orders'
import {log} from 'node:console'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2025-10-29.clover',
})

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
			log('Payment succeeded for intent:', paymentIntent.id)
			await Orders.findOneAndUpdate({paymentIntentId: paymentIntent.id}, {status: 'PAID'})
			break
		case 'payment_intent.payment_failed':
			log('Payment failed for intent:', paymentIntent.id)
			await Orders.findOneAndUpdate({paymentIntentId: paymentIntent.id}, {status: 'FAILED'})
			break
		case 'payment_intent.canceled':
			log('Payment canceled for intent:', paymentIntent.id)
			await Orders.findOneAndUpdate({paymentIntentId: paymentIntent.id}, {status: 'CANCELED'})
			break
	}

	res.json({received: true})
}
