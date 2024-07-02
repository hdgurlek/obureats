'use client'
import useRestaurantList from '@/api/hooks/useRestaurantList'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {createTheme, styled} from '@mui/material/styles'
import {RestaurantCard} from './RestaurantCard'
import {ThemeProvider} from 'styled-components'

const GridBox = styled(Box)(() => ({
	display: 'flex',
	flexGrow: '1',
	justifyContent: 'center',
	alignItems: 'center',
}))

const GridContainer = styled(Grid)(() => ({
	display: 'flex',
	gap: '1.6rem',
	alignItems: 'center',
	justifyContent: 'center',
}))

export default function RestaurantGrid() {
	const {data: restaurantList} = useRestaurantList()

	return (
		<GridBox>
			<GridContainer container>
				{restaurantList?.map(item => (
					<RestaurantCard
						id={item.id}
						key={item.id}
						name={item.name}
						slug={item.slug}
						rating={item.rating}
						deliveryTime={item.deliveryTime}
						favorite={item.favorite}
						image={item.image}
					></RestaurantCard>
				))}
			</GridContainer>
		</GridBox>
	)
}
