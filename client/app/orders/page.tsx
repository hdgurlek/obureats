'use client'

import {Box, Typography} from '@mui/material'

export default function OrdersPage() {
	return (
		<Box sx={{p: 4}}>
			<Typography variant="h4" sx={{fontWeight: 700, mb: 1}}>
				Orders
			</Typography>
			<Typography color="text.secondary">Your orders will appear here.</Typography>
		</Box>
	)
}
