'use client'

import {useSearchParams} from 'next/navigation'
import {useEffect, useState} from 'react'
import {Box, Typography, CircularProgress} from '@mui/material'
import {apiFetch} from '@/lib/apiClient'

export default function SuccessPage() {
	const API_URL = `/api/proxy?url=${process.env.NEXT_PUBLIC_API_URL}`

	const searchParams = useSearchParams()
	const paymentIntentId = searchParams.get('payment_intent')
	const [status, setStatus] = useState<'loading' | 'success' | 'processing' | 'failed'>('loading')

	useEffect(() => {
		if (!paymentIntentId) {
			setStatus('failed')
			return
		}

		async function checkPayment() {
			try {
				const res = await apiFetch(`${API_URL}/payments/status?pi=${paymentIntentId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const data = await res.json()
				console.log('Payment status response:', data)
				setStatus(data.status)
			} catch {
				setStatus('failed')
			}
		}

		checkPayment()
	}, [paymentIntentId])

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
