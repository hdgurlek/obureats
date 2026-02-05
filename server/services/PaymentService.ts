import {Types} from 'mongoose'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2025-10-29.clover',
})

export async function createPaymentIntent(
	totalPrice: number,
	p0: {metadata: {userId: Types.ObjectId; restaurantSlug: string | undefined}}
): Promise<Stripe.PaymentIntent> {
	if (!totalPrice || totalPrice <= 0) {
		throw new Error('Invalid payment amount')
	}

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(totalPrice * 100),
			currency: 'eur',
			payment_method_types: ['card'],
			automatic_payment_methods: {enabled: false},
			metadata: {
				userId: String(p0.metadata.userId),
				...(p0.metadata.restaurantSlug && {restaurantSlug: p0.metadata.restaurantSlug}),
			},
		})

		return paymentIntent
	} catch (err: any) {
		console.error('Stripe payment intent creation failed:', err)
		throw new Error(err?.message || 'Payment intent creation failed')
	}
}

export async function updatePaymentIntent(
	paymentIntentId: string,
	updates: {
		amount?: number
		metadata?: Record<string, string>
		description?: string
	}
): Promise<Stripe.PaymentIntent> {
	try {
		const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
			...(updates.amount && {amount: Math.round(updates.amount * 100)}),
			...(updates.metadata && {metadata: updates.metadata}),
			...(updates.description && {description: updates.description}),
		})

		return paymentIntent
	} catch (err: any) {
		console.error('Stripe payment intent update failed:', err)
		throw new Error(err?.message || 'PaymentIntent update failed')
	}
}

export async function cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
	try {
		const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId)
		return paymentIntent
	} catch (err: any) {
		console.error('Stripe payment intent cancel failed:', err)
		throw new Error(err?.message || 'PaymentIntent cancel failed')
	}
}

export async function getStatus(paymentIntentId: string): Promise<{status: string}> {
	console.log('Retrieving payment status for PI:', paymentIntentId)

	const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

	return {status: paymentIntent.status}
}
