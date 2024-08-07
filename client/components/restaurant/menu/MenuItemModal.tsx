'use client'

import useAddItemToCart from '@/api/hooks/useAddItemToCart'
import useMenuItem from '@/api/hooks/useMenuItem'
import CloseIcon from '@mui/icons-material/Close'
import {
	Box,
	Button,
	CardMedia,
	IconButton,
	MenuItem,
	Modal,
	Select,
	SelectChangeEvent,
	Typography,
	styled,
} from '@mui/material'
import {useRouter} from 'next/navigation'
import {useMemo, useState} from 'react'

const CloseButton = styled(IconButton)(() => ({
	position: 'absolute',
	top: 4,
	right: 4,
	padding: '8px',
	color: '#FFF',
}))

const ModalBox = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'row',
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 968,
	height: 500,
	backgroundColor: '#fff',
	boxShadow: '24',
	borderRadius: '1rem',
	gap: '2rem',
	padding: '2rem',
}))

const InfoBox = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	bgcolor: 'background.paper',
	padding: '0rem',
}))

const ItemName = styled(Typography)(() => ({}))

const ItemImage = styled(CardMedia)(() => ({
	component: 'img',
	alt: 'item-img',
	height: 492,
	width: '100%',
}))

const PriceText = styled(Typography)(() => ({
	color: 'gray',
}))

const AddBox = styled(Box)(() => ({
	display: 'flex',
	height: '3rem',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '0.5rem',
	marginTop: '1.5rem',
}))

const AddButton = styled(Button)(() => ({
	height: '3rem',
	width: '100%',
	backgroundColor: '#000',
	fontWeight: 500,
	'&:hover': {
		backgroundColor: '#262626',
	},
	margin: '1.5rem 0',
	textTransform: 'none',
	fontSize: '1.1rem',
}))

interface MenuItemModalProps {
	slug: string
	itemId: string
}

export default function MenuItemModal({slug, itemId: itemUuid}: MenuItemModalProps) {
	const router = useRouter()

	const [quantity, setQuantity] = useState(1)
	const {data: menuItem, isLoading: isMenuItemLoading} = useMenuItem(slug, itemUuid)
	const {mutate: addItemToCart} = useAddItemToCart(itemUuid, quantity)

	const handleChanges = (event: SelectChangeEvent) => {
		setQuantity(parseInt(event.target.value))
	}

	const quantities = useMemo(() => {
		const quantities = []

		for (let i = 1; i <= 10; i++) {
			quantities.push(<MenuItem value={i}>{i}</MenuItem>)
		}

		return quantities
	}, [])

	return (
		<Modal
			open={true}
			onClose={() => {
				router.back()
			}}
		>
			<ModalBox>
				{
					<CloseButton>
						<CloseIcon></CloseIcon>
					</CloseButton>
				}
				{isMenuItemLoading && <div>Loading...</div>}
				{!isMenuItemLoading && !menuItem && <div>Item not found</div>}
				{!isMenuItemLoading && menuItem && (
					<>
						<ItemImage image={menuItem.image} />
						<InfoBox>
							<ItemName variant="h4" gutterBottom>
								{menuItem.name}
							</ItemName>
							<PriceText variant="h5" gutterBottom>
								{`€${menuItem.price}`}
							</PriceText>
							<Typography gutterBottom style={{color: 'rgb(76, 76, 76)'}}>
								{menuItem.detail}
							</Typography>
							<AddBox>
								<Select sx={{height: '3rem'}} value={quantity.toString()} onChange={handleChanges}>
									{quantities}
								</Select>
								<AddButton variant="contained" onClick={() => addItemToCart()}>
									Add {quantity} to Order - € {menuItem.price * quantity}
								</AddButton>
							</AddBox>
						</InfoBox>
					</>
				)}
			</ModalBox>
		</Modal>
	)
}
