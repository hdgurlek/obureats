'use client'

import useMenu from '@/api/hooks/useMenu'
import useRestaurant from '@/api/hooks/useRestaurant'
import {CardMedia, Typography, styled} from '@mui/material'
import MenuItemModal from './menu/MenuItemModal'
import RestaurantMenu from './menu/RestaurantMenu'

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

interface RestaurantPageProps {
	slug: string
	itemId: string
}

export default function RestaurantPage({slug, itemId}: RestaurantPageProps) {
	const {data: restaurant, isLoading: isRestaurantLoading} = useRestaurant(slug)
	const {data: menu, isLoading: isMenuLoading} = useMenu(slug)

	if (isRestaurantLoading || isMenuLoading) return <div>Loading...</div>
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
