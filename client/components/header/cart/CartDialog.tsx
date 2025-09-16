'use client'

import useCart from '@/api/hooks/useCart'
import useRestaurant from '@/api/hooks/useRestaurant'
import CloseIcon from '@mui/icons-material/Close'
import {Box, Button, IconButton, Paper, ThemeProvider, Typography, createTheme, styled} from '@mui/material'
import CartItemRow from './CartItemRow'
import {ShoppingCart} from '@mui/icons-material'

const CloseButton = styled(IconButton)(() => ({
	position: 'absolute',
	top: '0.5rem',
	left: '0.5rem',
	padding: '8px',
	color: '#000',
}))

const CartContainer = styled(Paper)(() => ({
	width: '26rem',
	minHeight: '15rem',
	maxHeight: '30rem',
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
	fontWeight: 500,
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
	width: '100%',
	height: '100%',
	overflowY: 'scroll',
	flexGrow: 1,
	paddingBottom: '1rem',
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
	flexDirection: 'column',
	flexGrow: 1,
	justifyContent: 'center',
	alignItems: 'center',
	gap: '0.5rem',
}))

const CartEmptyText = styled(Typography)(() => ({
	fontSize: 16,
	textAlign: 'center',
	width: '60%',
}))

interface CartDialogProps {
	onClose: () => void
}

export default function CartDialog({onClose}: CartDialogProps) {
	const {data: cart} = useCart()
	const {data: restaurant} = useRestaurant(cart?.restaurantSlug)

	const isCartEmpty = !cart || cart.items?.length === 0

	return (
		<div>
			<CartContainer elevation={6}>
				{
					<CloseButton onClick={onClose}>
						<CloseIcon />
					</CloseButton>
				}
				{isCartEmpty && (
					<CartEmptyBox>
						<ShoppingCart fontSize="large" style={{color: 'black'}} />
						<CartEmptyText>Add items from a restaurant or store to start a new cart</CartEmptyText>
					</CartEmptyBox>
				)}

				{!isCartEmpty && (
					<>
						<br></br>
						<Typography sx={{paddingTop: '0.5rem', fontWeight: 500}} variant="h4" gutterBottom>
							{restaurant?.name}
						</Typography>
						<CartItemsBox>
							{cart && cart.items?.map(item => <CartItemRow key={item.itemUuid} item={item} />)}
						</CartItemsBox>
						{
							<SubtotalItem>
								<Typography flexGrow={1} fontWeight={500} variant="h6">
									Subtotal
								</Typography>
								<Typography fontWeight={500} variant="h6">
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
	)
}
