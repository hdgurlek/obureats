'use client'
import Card from '@mui/material/Card'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import {IconButton, CardMedia} from '@mui/material'
import Add from '@mui/icons-material/Add'
import Link from 'next/link'
import {MenuItem} from '@/types/Menu'

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
	padding: '1rem',
}))

const Name = styled(Typography)(() => ({
	display: 'flex',
	width: '100%',
	alignItems: 'center',
	fontWeight: 600,
}))

const Details = styled(Typography)(() => ({
	display: 'flex',
	width: '100%',
	alignContent: 'center',
	justifyContent: 'center',
	alignItems: 'center',
	color: 'rgba(121,121,121)',
	fontSize: '0.96rem',
}))

const Price = styled(Typography)(() => ({
	width: '100%',
	display: 'flex',
	alignContent: 'flex-start',
	fontWeight: 600,
}))

const AddItem = styled(IconButton)(() => ({
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
	return (
		<div>
			<Container>
				<Info>
					<Name variant="h6">{item.name}</Name>
					<Price variant="subtitle1">{item.price}</Price>
					<Details>{item.info}</Details>
				</Info>
				<ItemImage image={item.image}>
					{
						<Link
							key={item.uuid}
							href={`/restaurant/${restaurantSlug}/?itemId=${item.uuid}`}
							style={{textDecoration: 'none'}}
							passHref
						>
							<AddItem>
								<Add />
							</AddItem>
						</Link>
					}
				</ItemImage>
			</Container>
		</div>
	)
}
