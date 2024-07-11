'use client'

import {CartItem} from '@/types/Cart'
import {Stack, Typography} from '@mui/material'

interface CartItemProps {
	item: CartItem
}

export default function CartItemRow({item}: CartItemProps) {
	return (
		<Stack direction="row" spacing={2} sx={{alignItems: 'center', borderBottom: 'solid 0.1rem #cccaca'}}>
			<Typography>{item.quantity}</Typography>
			<Typography sx={{width: '100%', fontWeight: '600'}}>{item.name}</Typography>
			<Typography flexGrow={3}>€{item.price}</Typography>
		</Stack>
	)
}
