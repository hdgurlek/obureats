import {Menu} from '@/types/Menu'
import {Grid, Typography} from '@mui/material'
import {MenuItemCard} from './MenuItemCard'
import styled from 'styled-components'

const MenuCategoryGrid = styled(Grid)(() => ({
	display: 'flex',
	flexDirection: 'row',
	gap: '1rem',
	justifyContent: 'center',
	alignItems: 'center',
	margin: '1rem 0',
}))

interface MenuProps {
	menu: Menu
	restaurantSlug: string
}

export default function RestaurantMenu({menu, restaurantSlug}: MenuProps) {
	return (
		<div>
			{menu.categories.map((category, i) => (
				<div key={i}>
					<Typography fontWeight={600} variant="h6">
						{category.name}
					</Typography>
					<MenuCategoryGrid>
						{category.items.map((item, i) => (
							<MenuItemCard key={i} item={item} restaurantSlug={restaurantSlug} />
						))}
					</MenuCategoryGrid>
				</div>
			))}
		</div>
	)
}
