import {Menu} from '@/types/Menu'
import {Grid, Typography} from '@mui/material'
import {MenuItemCard} from './MenuItemCard'
import styled from 'styled-components'

const MenuCategoryGrid = styled(Grid)(() => ({
	display: 'flex',
	flexDirection: 'row',
	gap: '1rem',
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
				<div key={i} style={{paddingBottom: '1.5rem'}}>
					<Typography fontWeight={500} variant="h5">
						{category.name}
					</Typography>
					<MenuCategoryGrid>
						{category.items.map(item => (
							<MenuItemCard key={item.uuid} item={item} restaurantSlug={restaurantSlug} />
						))}
					</MenuCategoryGrid>
				</div>
			))}
		</div>
	)
}
