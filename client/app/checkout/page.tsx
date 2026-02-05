'use client'

import usePaymentIntent from '@/api/hooks/useCheckout'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import {Box} from '@mui/material'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {useEffect, useState} from 'react'
import {Card, styled} from '@mui/material'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import {getCart} from '@/api/api'
import {Cart} from '@/types/Cart'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
	const [clientSecret, setClientSecret] = useState<string | null>(null)
	const [cart, setCart] = useState<Cart | null>(null)
	const {mutate: createPaymentIntent, data: paymentIntent} = usePaymentIntent()

	useEffect(() => {
		createPaymentIntent()
	}, [createPaymentIntent])

	useEffect(() => {
		let isMounted = true
		async function fetchCart() {
			try {
				const data = await getCart()
				if (isMounted) setCart(data)
			} catch {
				if (isMounted) setCart(null)
			}
		}
		fetchCart()
		return () => {
			isMounted = false
		}
	}, [])

	useEffect(() => {
		if (paymentIntent?.clientSecret) {
			setClientSecret(paymentIntent?.clientSecret)
		}
	}, [paymentIntent])

	if (!clientSecret) return <div className="p-8 text-center">Loading…</div>

	const options = {
		layout: {
			type: 'tabs',
			defaultCollapsed: false,
		},
	}

	const appearance = {
		theme: 'stripe' as const,
		variables: {
			colorPrimary: '#000000',
		},
	}

	const OrderCard = styled(Card)(() => ({
		display: 'flex',
		flexDirection: 'column',
		width: 390,
		height: 'auto',
		padding: '1.5rem',
		borderRadius: '0.5rem',
		boxShadow: 'none',
		backgroundColor: '#fff',
	}))

	const OrderRow = styled(Box)(() => ({
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '0.5rem',
	}))

	const items = cart?.items ?? paymentIntent?.order?.items ?? []
	const total = cart?.totalPrice ?? paymentIntent?.order?.totalPrice

	return (
		<Box
			className="justify-center p-4 md:p-8 direction-column md:direction-row"
			sx={{display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', padding: 4}}
		>
			{/* Stripe Form */}
			<Box sx={{flex: 1, minWidth: '50%', maxWidth: 500}}>
				<Elements stripe={stripePromise} options={{clientSecret, appearance, ...options}}>
					<CheckoutForm />
				</Elements>
			</Box>

			{/* Order Summary */}
			<Box sx={{flex: 1, minWidth: 300, maxWidth: 400}}>
				<OrderCard>
					<Typography variant="h6" sx={{fontWeight: 600, mb: 2}}>
						Order Summary
					</Typography>

					<Divider sx={{my: 2}} />

					{/* Item list */}
					{items.map((item: any) => (
						<OrderRow key={item.itemUuid}>
							<Typography variant="body1" sx={{flex: 1}}>
								{item.name} × {item.quantity}
							</Typography>
							<Typography variant="body1">€{(item.price * item.quantity).toFixed(2)}</Typography>
						</OrderRow>
					))}

					<Divider sx={{my: 2}} />

					{/* Summary details */}
					<OrderRow>
						<Typography variant="body2" color="text.secondary">
							Subtotal
						</Typography>
						<Typography variant="body2">
							€
							{items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0).toFixed(2)}
						</Typography>
					</OrderRow>

					<OrderRow>
						<Typography variant="body2" color="text.secondary">
							Delivery
						</Typography>
						<Typography variant="body2">€3.00</Typography>
					</OrderRow>

					<OrderRow>
						<Typography variant="body2" color="text.secondary">
							Tax
						</Typography>
						<Typography variant="body2">€2.50</Typography>
					</OrderRow>

					<Divider sx={{my: 2}} />

					{/* Total */}
					<OrderRow>
						<Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
							Total
						</Typography>
						<Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
							€{(total ?? 0).toFixed(2)}
						</Typography>
					</OrderRow>

					{/* Extra info */}
					<Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
						Order ID: {paymentIntent?.order?.id}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Items: {paymentIntent?.order?.items?.length ?? 0}
					</Typography>
				</OrderCard>
			</Box>
		</Box>
	)
}
