'use client'
import useAddItemToCart from '@/api/hooks/useAddItemToCart'
import useCart from '@/api/hooks/useCart'
import {MenuItem} from '@/types/Menu'
import Add from '@mui/icons-material/Add'
import {CardMedia, IconButton} from '@mui/material'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import {styled} from '@mui/material/styles'
import Link from 'next/link'
import {useMemo} from 'react'

const Container = styled(Card)(() => ({
	display: 'flex',
	flexDirection: 'row',
	height: 145,
	maxWidth: 660,
	transition: '0.4s',
	boxShadow: 'none',
	border: '0.1rem solid #eaeaea',
	borderRadius: '1rem',
}))

const ItemImage = styled(CardMedia)({
	display: 'flex',
	width: 145,
	height: 145,
	borderRadius: '0 1rem 1rem 0',
	justifySelf: 'flex-end',
	minWidth: 145,
	minHeight: 145,
})

const Info = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',
	width: '100%',
	padding: '1.1rem',
	rowGap: '0.1rem',
}))

const Name = styled(Typography)(() => ({
	display: 'flex',
	width: '100%',
	alignItems: 'center',
	fontWeight: 600,
	fontSize: '18px',
}))

const Price = styled(Typography)(() => ({
	width: '100%',
	display: 'flex',
	alignContent: 'flex-start',
}))

const Details = styled(Typography)(() => ({
	display: 'flex',
	width: '90%',
	height: '2.5rem',
	alignContent: 'center',
	justifyContent: 'center',
	alignItems: 'start',
	color: 'rgba(121,121,121)',
	fontSize: '16px',
	overflow: 'clip',
}))

const AddItemButton = styled(IconButton)(() => ({
	width: 38,
	height: 38,
	backgroundColor: '#fff',
	border: 'solid 1px rgba(0,0,0,0.2)',
	boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
	color: 'rgba(0, 0, 0, 0.74)',
	'&:hover': {
		backgroundColor: 'rgba(221, 221, 221)',
		color: '#000',
	},
	position: 'relative',
	top: 95,
	left: 95,
}))

interface MenuItemCardProps {
	item: MenuItem
	restaurantSlug: string
}

export function MenuItemCard({item, restaurantSlug}: MenuItemCardProps) {
	const {data: cart} = useCart()
	const {mutate: addItemToCart} = useAddItemToCart(restaurantSlug, item.uuid, 1)
	const quantity = useMemo(() => {
		const itemInCart = cart?.items.find(i => i.uuid === item.uuid)
		return itemInCart?.quantity
	}, [cart?.items, item.uuid])

	return (
		<Link
			key={item.uuid}
			href={`/restaurant/${restaurantSlug}/?itemId=${item.uuid}`}
			style={{textDecoration: 'none'}}
			passHref
		>
			<Container>
				<Info>
					<Name>{item.name}</Name>
					<Price variant="body1">€{item.price}</Price>
					<Details variant="inherit">{item.detail}</Details>
				</Info>
				<ItemImage image={item.image}>
					<AddItemButton
						onClick={e => {
							addItemToCart()
							e.preventDefault()
						}}
					>
						{quantity && quantity > 0 && <Typography>{quantity}</Typography>}
						{(!quantity || quantity === 0) && <Add />}
					</AddItemButton>
				</ItemImage>
			</Container>
		</Link>
	)
}
