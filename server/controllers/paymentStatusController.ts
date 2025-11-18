import Stripe from 'stripe'
import {OK} from '../constants/http'
import catchErrors from '../utils/catchErrors'
import {getStatus} from '../services/PaymentService'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2025-09-30.clover',
})

export const paymentStatusHandler = catchErrors(async (req, res) => {
	const pi = req.query.pi
	if (!pi) {
		return res.status(400).json({error: 'Missing pi'})
	}

	const status = await getStatus(pi as string)
	console.log('Payment status retrieved:', status)
	return res.status(OK).json(status)
})
