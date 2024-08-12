'use client'

import {CartItem} from '@/types/Cart'
import {Stack, Typography} from '@mui/material'
import CartItemQuantitySelect from './CartItemQuantitySelect'

interface CartItemProps {
	item: CartItem
}

export default function CartItemRow({item}: CartItemProps) {
	return (
		<Stack
			direction="row"
			spacing={2}
			sx={{padding: '0.5rem 0', alignItems: 'center', borderBottom: 'solid 0.1rem #ececec'}}
		>
			<CartItemQuantitySelect item={item}></CartItemQuantitySelect>
			<Typography sx={{width: '100%', fontWeight: 500}}>{item.name}</Typography>
			<Typography flexGrow={3}>€{item.price * item.quantity}</Typography>
		</Stack>
	)
}
