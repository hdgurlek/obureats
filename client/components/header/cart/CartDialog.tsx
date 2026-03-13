'use client'

import useCart from '@/api/hooks/useCart'
import useRestaurant from '@/api/hooks/useRestaurant'
import {ShoppingCart} from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import {Box, Button, Divider, Drawer, IconButton, Typography, styled} from '@mui/material'
import CartItemRow from './CartItemRow'

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
	overflowY: 'auto',
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
	open: boolean
	onClose: () => void
}

export default function CartDialog({open, onClose}: CartDialogProps) {
	const {data: cart} = useCart()
	const {data: restaurant} = useRestaurant(cart?.restaurantSlug)

	const totalQuantity = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0
	const isCartEmpty = totalQuantity === 0

	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					width: {xs: '100vw', sm: 380},
					backgroundColor: '#ffffff',
					color: '#000000',
					borderLeft: '1px solid #e5e5e5',
					display: 'flex',
					flexDirection: 'column',
				},
			}}
			BackdropProps={{sx: {backgroundColor: 'rgba(0,0,0,0.2)'}}}
		>
			<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2}}>
				<Typography variant="h6" sx={{fontWeight: 700}}>
					Cart
				</Typography>
				<IconButton onClick={onClose} size="small" sx={{color: '#000'}}>
					<CloseIcon />
				</IconButton>
			</Box>
			<Divider />

			<Box sx={{p: 2, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
				{isCartEmpty ? (
					<CartEmptyBox>
						<ShoppingCart fontSize="large" style={{color: 'black'}} />
						<CartEmptyText>Add items from a restaurant or store to start a new cart</CartEmptyText>
					</CartEmptyBox>
				) : (
					<>
						<Typography sx={{fontWeight: 700, mb: 1}} variant="h5">
							{restaurant?.name}
						</Typography>
						<CartItemsBox>
							{cart && cart.items?.map((item) => <CartItemRow key={item.itemUuid} item={item} />)}
						</CartItemsBox>

						<SubtotalItem>
							<Typography flexGrow={1} fontWeight={600} variant="h6">
								Subtotal
							</Typography>
							<Typography fontWeight={600} variant="h6">
								€{cart?.totalPrice}
							</Typography>
						</SubtotalItem>

						<CheckOutButton
							href="/checkout"
							variant="contained"
							size="large"
							onClick={onClose}
						>
							Go to checkout
						</CheckOutButton>
					</>
				)}
			</Box>
		</Drawer>
	)
}
