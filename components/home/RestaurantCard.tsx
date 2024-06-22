'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import {Favorite, FavoriteBorderOutlined} from '@mui/icons-material'
import {IconButton} from '@mui/material'
import {Restaurant} from '../../types/Restaurant'
import Link from 'next/link'

const Container = styled(Card)(() => ({
	display: 'flex',
	flexDirection: 'column',
	width: 288,
	height: 230,
	overflow: 'visible',
	transition: '0.4s',
	boxShadow: 'none',
	borderRadius: '0.5rem',
}))

const RestaurantImage = styled(CardMedia)({
	display: 'flex',
	position: 'relative',
	width: '100%',
	height: 130,
	borderRadius: '0.5rem',
})

const InfoBox = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	overflow: 'hidden',
	paddingTop: '1rem',
	zIndex: 1,
	alignContent: 'center',
}))

const InfoContent = styled('div')(() => ({
	display: 'flex',
	width: '100%',
	alignContent: 'center',
	justifyContent: 'center',
	alignItems: 'center',
}))

const RatingBadge = styled('div')(() => ({
	display: 'flex',
	alignContent: 'center',
	justifyContent: 'center',
	width: '1.8rem',
	height: '1.8rem',
	fontWeight: '600',
	fontSize: '13px',
	borderRadius: '50%',
	padding: '0.2rem 0.2rem',
	backgroundColor: '#d5d5d5',
}))

const RatingText = styled(Typography)(() => ({
	display: 'flex',
	alignItems: 'center',
	padding: '0.4rem 0.4rem',
}))

const FavoriteButton = styled(IconButton)(() => ({
	position: 'absolute',
	top: 4,
	right: 4,
	padding: '8px',
	color: '#FFF',
}))

const FavoriteIcon = styled(FavoriteBorderOutlined)(() => ({}))

const FilledFavoriteIcon = styled(Favorite)(() => ({}))

const RestaurantName = styled(Typography)(() => ({
	display: 'flex',
	alignItems: 'center',
	color: 'black',
	width: '100%',
	height: '2rem',
}))

const DeliveryTime = styled(Typography)(() => ({
	width: '100%',
	color: 'gray',
	display: 'flex',
	alignContent: 'flex-start',
}))

export function RestaurantCard(props: Restaurant) {
	return (
		<Container>
			<RestaurantImage image={props.image}>
				<FavoriteButton onClick={() => ({})}>
					{props.favorite ? <FilledFavoriteIcon /> : <FavoriteIcon />}
				</FavoriteButton>
			</RestaurantImage>
			<Link href={`/restaurant/${props.slug}`} style={{textDecoration: 'none'}} passHref>
				<InfoBox>
					<InfoContent>
						<RestaurantName variant="h6">{props.name}</RestaurantName>
						<RatingBadge>
							<RatingText>{props.rating}</RatingText>
						</RatingBadge>
					</InfoContent>
					<InfoContent>
						<DeliveryTime variant="body1">{props.deliveryTime}</DeliveryTime>
					</InfoContent>
				</InfoBox>
			</Link>
		</Container>
	)
}
