import useCart from '@/api/hooks/useCart'
import {ShoppingCartOutlined} from '@mui/icons-material'
import {IconButton, Typography, styled} from '@mui/material'
import {useCallback, useState} from 'react'
import CartDialog from './CartDialog'

const CartItemsQuantityBadge = styled('div')(() => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '0.8rem',
	height: '0.8rem',
	fontSize: '10px',
	borderRadius: '50%',
	padding: '0.2rem 0.2rem',
	backgroundColor: '#008542',
	color: '#fff',
	position: 'absolute',
	top: 2,
	right: 2,
}))

export default function Cart() {
	const [isOpen, setIsOpen] = useState(false)
	const {data: cart} = useCart()
	const totalQuantity = cart?.items.flatMap(item => item.quantity).reduce((sum, quantity) => sum + quantity, 0)

	const onClose = useCallback(() => {
		setIsOpen(false)
	}, [])

	return (
		<div>
			<IconButton size="large" color="inherit" onClick={() => setIsOpen(!isOpen)}>
				<ShoppingCartOutlined style={{color: 'black'}} />
				{totalQuantity !== 0 && (
					<CartItemsQuantityBadge>
						<Typography variant="caption">{totalQuantity}</Typography>
					</CartItemsQuantityBadge>
				)}
			</IconButton>
			{isOpen && <CartDialog onClose={onClose} />}
		</div>
	)
}
