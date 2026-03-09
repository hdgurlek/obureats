'use client'

import useOrderHistory from '@/api/hooks/useOrderHistory'
import useUser from '@/api/hooks/useUser'
import {Alert, Box, Button, Card, CardContent, Divider, Skeleton, Stack, Typography} from '@mui/material'
import Link from 'next/link'

const currencyFormatter = new Intl.NumberFormat('nl-NL', {
	style: 'currency',
	currency: 'EUR',
})

const dateFormatter = new Intl.DateTimeFormat('nl-NL', {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
})

export default function OrdersPage() {
	const user = useUser()
	const isLoggedIn = Boolean(user.data?.email)
	const ordersQuery = useOrderHistory(isLoggedIn)

	if (user.isLoading) {
		return (
			<Box sx={{p: {xs: 2, md: 4}, maxWidth: 960, mx: 'auto', width: '100%'}}>
				<Skeleton variant="text" width={180} height={48} />
				<Skeleton variant="text" width={320} height={24} />
				<Stack spacing={2} sx={{mt: 2}}>
					<Skeleton variant="rounded" height={160} />
					<Skeleton variant="rounded" height={160} />
					<Skeleton variant="rounded" height={160} />
				</Stack>
			</Box>
		)
	}

	if (!isLoggedIn) {
		return (
			<Box sx={{p: {xs: 2, md: 4}, maxWidth: 960, mx: 'auto', width: '100%'}}>
				<Typography variant="h4" sx={{fontWeight: 700, mb: 1}}>
					Orders
				</Typography>
				<Alert severity="info" sx={{mb: 2}}>
					You need to log in to view your order history.
				</Alert>
				<Button component={Link} href="/login" variant="contained" sx={{textTransform: 'none'}}>
					Log in
				</Button>
			</Box>
		)
	}

	if (ordersQuery.isLoading) {
		return (
			<Box sx={{p: {xs: 2, md: 4}, maxWidth: 960, mx: 'auto', width: '100%'}}>
				<Skeleton variant="text" width={180} height={48} />
				<Skeleton variant="text" width={320} height={24} />
				<Stack spacing={2} sx={{mt: 2}}>
					<Skeleton variant="rounded" height={160} />
					<Skeleton variant="rounded" height={160} />
					<Skeleton variant="rounded" height={160} />
				</Stack>
			</Box>
		)
	}

	if (ordersQuery.isError) {
		return (
			<Box sx={{p: {xs: 2, md: 4}, maxWidth: 960, mx: 'auto', width: '100%'}}>
				<Typography variant="h4" sx={{fontWeight: 700, mb: 1}}>
					Orders
				</Typography>
				<Alert severity="error" sx={{mb: 2}}>
					{ordersQuery.error instanceof Error ? ordersQuery.error.message : 'Failed to load orders.'}
				</Alert>
				<Button variant="outlined" onClick={() => ordersQuery.refetch()} sx={{textTransform: 'none'}}>
					Try again
				</Button>
			</Box>
		)
	}

	const orders = ordersQuery.data?.orders ?? []

	return (
		<Box sx={{p: {xs: 2, md: 4}, maxWidth: 960, mx: 'auto', width: '100%'}}>
			<Typography variant="h4" sx={{fontWeight: 700, mb: 3}}>
				Past Orders
			</Typography>

			{orders.length === 0 ? (
				<Card
					variant="outlined"
					sx={{
						borderRadius: 3,
						background: 'linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%)',
					}}
				>
					<CardContent sx={{py: 4}}>
						<Typography variant="h6" sx={{fontWeight: 600, mb: 1}}>
							No completed orders yet
						</Typography>
						<Typography color="text.secondary">When you complete your first payment, it will appear here.</Typography>
					</CardContent>
				</Card>
			) : (
				<Stack spacing={2}>
					{orders.map(order => (
						<Card key={order.id} variant="outlined" sx={{borderRadius: 3, overflow: 'hidden'}}>
							<CardContent sx={{p: {xs: 2, md: 2.5}}}>
								<Stack direction="row" spacing={1.5} justifyContent="space-between" sx={{mb: 1.5}}>
									<Stack direction="row" spacing={1.5} alignItems="center">
										<Box
											component="img"
											src={order.restaurantImage ?? '/next.svg'}
											alt={`${order.restaurantName} thumbnail`}
											sx={{
												width: {xs: 72, sm: 84},
												height: {xs: 72, sm: 84},
												borderRadius: 2,
												objectFit: 'cover',
												border: '1px solid',
												borderColor: 'divider',
												flexShrink: 0,
											}}
										/>
										<Box>
											<Typography variant="h6" sx={{fontWeight: 700, lineHeight: 1.2}}>
												{order.restaurantName}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{dateFormatter.format(new Date(order.createdAt))}
											</Typography>
										</Box>
									</Stack>
									<Stack direction="row" spacing={1} alignItems="center">
										<Typography variant="subtitle1" sx={{fontWeight: 700}}>
											{currencyFormatter.format(order.totalPrice)}
										</Typography>
									</Stack>
								</Stack>

								<Divider sx={{mb: 1.5}} />

								<Stack spacing={0.75}>
									{order.items.map(item => (
										<Stack key={item.itemUuid} direction="row" justifyContent="space-between" alignItems="center">
											<Typography variant="body2">
												{item.quantity}x {item.name}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{currencyFormatter.format(item.price * item.quantity)}
											</Typography>
										</Stack>
									))}
								</Stack>

								<Stack direction="row" justifyContent="flex-end" sx={{mt: 2}}>
									<Button
										component={Link}
										href={`/restaurant/${order.restaurantSlug}`}
										variant="outlined"
										size="small"
										sx={{textTransform: 'none'}}
									>
										View store
									</Button>
								</Stack>
							</CardContent>
						</Card>
					))}
				</Stack>
			)}
		</Box>
	)
}
