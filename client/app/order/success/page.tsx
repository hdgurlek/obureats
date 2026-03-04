'use client'

import {useSearchParams} from 'next/navigation'
import {useEffect, useState} from 'react'
import {Box, Typography, CircularProgress} from '@mui/material'
import {apiFetch} from '@/lib/apiClient'
import {useQueryClient} from '@tanstack/react-query'

export default function SuccessPage() {
	const API_URL = `/api/proxy?url=${process.env.NEXT_PUBLIC_API_URL}`
	const queryClient = useQueryClient()

	const searchParams = useSearchParams()
	const paymentIntentId = searchParams.get('payment_intent')
	const [status, setStatus] = useState<
		'loading' | 'success' | 'processing' | 'failed' | 'action_required' | 'canceled'
	>('loading')

	useEffect(() => {
		if (!paymentIntentId) {
			setStatus('failed')
			return
		}

		async function checkPayment() {
			console.log('Checking payment status for PaymentIntent ID:', paymentIntentId)

			try {
				const res = await apiFetch(`${API_URL}/payments/status?pi=${paymentIntentId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const data = await res.json()
				console.log('Payment status response:', data)
				switch (data.status) {
					case 'succeeded':
						setStatus('success')
						break
					case 'processing':
						setStatus('processing')
						break
					case 'requires_action':
						setStatus('action_required')
						break
					case 'canceled':
						setStatus('canceled')
						break
					case 'requires_payment_method':
					case 'requires_confirmation':
					case 'requires_capture':
						setStatus('failed')
						break
					default:
						setStatus('failed')
				}
			} catch {
				setStatus('failed')
			}
		}

		checkPayment()
	}, [paymentIntentId])

	useEffect(() => {
		console.log('Payment status changed:', status)
		if (status === 'success') {
			console.log('Payment successful, invalidating cart query')

			queryClient.invalidateQueries({queryKey: ['cart']})
		}
	}, [queryClient, status])

	if (status === 'loading')
		return (
			<Box p={4} textAlign="center">
				<CircularProgress />
				<Typography mt={2}>Verifying your payment...</Typography>
			</Box>
		)

	if (status === 'processing')
		return (
			<Box p={4} textAlign="center">
				<Typography variant="h5">Your payment is still processing…</Typography>
				<Typography>Please wait a moment.</Typography>
			</Box>
		)

	if (status === 'action_required')
		return (
			<Box p={4} textAlign="center">
				<Typography variant="h5">Additional action required.</Typography>
				<Typography>Please complete the payment authorization.</Typography>
			</Box>
		)

	if (status === 'canceled')
		return (
			<Box p={4} textAlign="center">
				<Typography variant="h5" color="error">
					Payment canceled.
				</Typography>
				<Typography>Please try again.</Typography>
			</Box>
		)

	if (status === 'failed')
		return (
			<Box p={4} textAlign="center">
				<Typography variant="h5" color="error">
					Payment failed.
				</Typography>
				<Typography>Please try again.</Typography>
			</Box>
		)

	return (
		<Box p={4} textAlign="center">
			<Typography variant="h4" fontWeight={600}>
				✅ Payment successful!
			</Typography>
			<Typography variant="subtitle1">Your order is being prepared.</Typography>
		</Box>
	)
}
