'use client'

import {getRestaurant, getRestaurantMenu} from '@/src/api'
import {Menu} from '@/types/Menu'
import {Restaurant} from '@/types/Restaurant'
import {CardMedia, Typography, styled} from '@mui/material'
import {useCallback, useEffect, useState} from 'react'
import RestaurantMenu from './menu/RestaurantMenu'
import MenuItemModal from './menu/MenuItemModal'

const HeaderImage = styled(CardMedia)(() => ({
	display: 'flex',
	justifyContent: 'center',
	alignSelf: 'center',
	height: 250,
	width: '100%',
	borderRadius: '1rem',
}))

const RestaurantContainer = styled(`div`)(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignContent: 'center',
	justifyContent: 'center',
	width: '64%',
	margin: 'auto',
}))

const RestaurantHeader = styled(`div`)(() => ({
	margin: '20px 0px',
}))

async function getMenu(slug: string) {
	return getRestaurantMenu(slug)
}

interface RestaurantPageProps {
	slug: string
	itemId: string
}

export default function RestaurantPage({slug, itemId}: RestaurantPageProps) {
	const [menu, setMenu] = useState<Menu | null>(null)
	const [restaurant, setRestaurant] = useState<Restaurant | null>(null)

	const [loading, setLoading] = useState(true)

	const fetchMenu = useCallback(async () => {
		if (!slug) return

		try {
			const restaurant = await getRestaurant(slug)
			const menu = await getMenu(slug)
			setMenu(menu)
			setRestaurant(restaurant)
			setLoading(false)
		} catch (error) {
			console.error('Error fetching menu:', error)
			setLoading(false)
		}
	}, [slug])

	useEffect(() => {
		fetchMenu()
	}, [fetchMenu])

	if (loading) return <div>Loading...</div>
	if (!restaurant || !menu) return <div>Restaurant not found</div>

	console.log('image : ' + restaurant.image)
	return (
		<>
			{itemId && <MenuItemModal slug={slug} itemId={itemId} />}
			<RestaurantContainer>
				<HeaderImage image={restaurant.image} />
				<RestaurantHeader>
					<Typography fontWeight={600} variant="h4">
						{restaurant.name}
					</Typography>
				</RestaurantHeader>
				<RestaurantMenu menu={menu} restaurantSlug={slug} />
			</RestaurantContainer>
		</>
	)
}
