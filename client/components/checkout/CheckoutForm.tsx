'use client'

import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'
import {useState} from 'react'
import Spinner from '../ui/Spinner'
import {Button, styled} from '@mui/material'

export default function CheckoutForm() {
	const stripe = useStripe()
	const elements = useElements()
	const [isLoading, setLoading] = useState(false)
	const [message, setMessage] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!stripe || !elements) return

		setLoading(true)

		const {error} = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: window.location.origin + '/order/success',
			},
		})

		if (error) {
			if (error.type === 'card_error' || error.type === 'validation_error') {
				setMessage(error.message ?? null)
			} else {
				setMessage('An unexpected error occurred.')
			}
		}

		setLoading(false)
	}

	const PayButton = styled(Button)(() => ({
		position: 'relative',
		fontSize: '1rem',
		fontWeight: 500,
		background: isLoading ? '#a7a7a7' : '#000000',
		color: '#fff',
		'&:hover': {
			backgroundColor: '#262626',
		},
		textTransform: 'none',
		':disabled': {isLoading},
	}))

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement id="payment-element" />

			<PayButton
				variant="contained"
				size="large"
				sx={{width: '100%', marginTop: 2}}
				disabled={isLoading || !stripe || !elements}
				type="submit"
			>
				{isLoading ? <Spinner /> : 'Place Order'}
			</PayButton>
			{message && <div id="payment-message">{message}</div>}
		</form>
	)
}
