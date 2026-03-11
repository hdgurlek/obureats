'use client'

import useFavorites from '@/api/hooks/useFavorites'
import useUser from '@/api/hooks/useUser'
import {Alert, Box, Button, CircularProgress, Stack, Typography} from '@mui/material'
import Link from 'next/link'
import {RestaurantCard} from '@/components/home/RestaurantCard'

export default function FavoritesPage() {
	const user = useUser()
	const isLoggedIn = Boolean(user.data?.email)
	const favoritesQuery = useFavorites(isLoggedIn)

	if (user.isLoading) {
		return (
			<Box sx={{p: 4, textAlign: 'center'}}>
				<CircularProgress size={24} />
			</Box>
		)
	}

	if (!isLoggedIn) {
		return (
			<Box sx={{p: 4, maxWidth: 960, mx: 'auto'}}>
				<Typography variant="h4" sx={{fontWeight: 700, mb: 1}}>
					Favorites
				</Typography>
				<Alert severity="info" sx={{mb: 2}}>
					Log in to view your favorite restaurants.
				</Alert>
				<Button component={Link} href="/login" variant="contained" disableElevation sx={{textTransform: 'none', backgroundColor: '#000', '&:hover': {backgroundColor: '#262626'}}}>
					Log in
				</Button>
			</Box>
		)
	}

	if (favoritesQuery.isLoading) {
		return (
			<Box sx={{p: 4, textAlign: 'center'}}>
				<CircularProgress size={24} />
			</Box>
		)
	}

	if (favoritesQuery.isError) {
		return (
			<Box sx={{p: 4, maxWidth: 960, mx: 'auto'}}>
				<Typography variant="h4" sx={{fontWeight: 700, mb: 1}}>
					Favorites
				</Typography>
				<Alert severity="error" sx={{mb: 2}}>
					{favoritesQuery.error instanceof Error ? favoritesQuery.error.message : 'Failed to load favorites.'}
				</Alert>
				<Button variant="outlined" onClick={() => favoritesQuery.refetch()} sx={{textTransform: 'none'}}>
					Try again
				</Button>
			</Box>
		)
	}

	const favorites = favoritesQuery.data?.restaurants ?? []

	return (
		<Box sx={{p: 4}}>
			<Typography variant="h4" sx={{fontWeight: 700, mb: 1}}>
				Favorites
			</Typography>
			<Typography color="text.secondary" sx={{mb: 3}}>
				Your favorite restaurants.
			</Typography>

			{favorites.length === 0 ? (
				<Alert severity="info">No favorites yet. Tap the heart icon on a restaurant to save it.</Alert>
			) : (
				<Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center'}}>
					{favorites.map((r) => (
						<RestaurantCard
							key={r.slug}
							name={r.name}
							slug={r.slug}
							rating={r.rating}
							deliveryTime={r.deliveryTime}
							favorite={true}
							image={r.image}
						/>
					))}
				</Box>
			)}
		</Box>
	)
}
