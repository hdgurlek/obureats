'use client'

import useCart from '@/api/hooks/useCart'
import useRestaurant from '@/api/hooks/useRestaurant'
import {Box, Button, IconButton, Paper, ThemeProvider, Typography, createTheme, styled} from '@mui/material'
import CartItemRow from './CartItemRow'
import CloseIcon from '@mui/icons-material/Close'
import {useState} from 'react'

const CloseButton = styled(IconButton)(() => ({
	position: 'absolute',
	top: '0.5rem',
	left: '0.5rem',
	padding: '8px',
	color: '#000',
}))

const CartContainer = styled(Paper)(() => ({
	width: '26rem',
	minHeight: '20rem',
	maxHeight: '20rem',
	position: 'absolute',
	right: '2rem',
	top: '3.3rem',
	padding: '1.5rem',
	display: 'flex',
	flexDirection: 'column',
}))

const CheckOutButton = styled(Button)(() => ({
	position: 'relative',
	fontSize: '1rem',
	fontWeight: 600,
	backgroundColor: '#000',
	color: '#fff',
	'&:hover': {
		backgroundColor: '#262626',
	},
	textTransform: 'none',
}))

const CartItemsBox = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	width: '24rem',
	height: '100%',
	padding: '1rem 1rem',
	overflowY: 'scroll',
	flexGrow: 1,
	marginBottom: '1rem',
	msOverflow: 'auto',
}))

const SubtotalItem = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	minHeight: '2rem',
	marginBottom: '1rem',
}))

const CartEmptyBox = styled(Box)(() => ({
	display: 'flex',
	flexGrow: 1,
	justifyContent: 'center',
	alignItems: 'center',
	height: '20rem',
}))

const CartEmptyText = styled(Typography)(() => ({
	display: 'flex',
	alignItems: 'center',
	flex: 1,
	justifyContent: 'center',
}))

const theme = createTheme({
	typography: {
		fontSize: 14,
		fontFamily: 'inherit',
	},
})

interface CartDialogProps {
	onClose: () => void
}

export default function CartDialog({onClose}: CartDialogProps) {
	const {data: cart} = useCart()
	const {data: restaurant} = useRestaurant(cart?.restaurantSlug)

	const isCartEmpty = !cart || cart.items.length === 0

	return (
		<ThemeProvider theme={theme}>
			<div>
				<CartContainer elevation={6}>
					{
						<CloseButton onClick={onClose}>
							<CloseIcon />
						</CloseButton>
					}
					{isCartEmpty && (
						<CartEmptyBox>
							<CartEmptyText>Cart Empty</CartEmptyText>
						</CartEmptyBox>
					)}

					{!isCartEmpty && (
						<>
							<br></br>
							<Typography sx={{fontWeight: 600}} variant="h4" gutterBottom>
								{restaurant?.name}
							</Typography>
							<Typography sx={{fontWeight: 600}} variant="subtitle1">
								items
							</Typography>
							<CartItemsBox>
								{cart.items.map(item => (
									<CartItemRow key={item.uuid} item={item} />
								))}
							</CartItemsBox>
							{
								<SubtotalItem>
									<Typography flexGrow={1} fontWeight={600} variant="h6">
										Subtotal
									</Typography>
									<Typography fontWeight={600} variant="h6">
										€{cart.totalPrice}
									</Typography>
								</SubtotalItem>
							}
							{
								<CheckOutButton variant="contained" size="large">
									Go to checkout
								</CheckOutButton>
							}
						</>
					)}
				</CartContainer>
			</div>
		</ThemeProvider>
	)
}
