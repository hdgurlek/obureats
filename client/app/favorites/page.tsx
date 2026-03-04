'use client'

import {Box, Typography} from '@mui/material'

export default function FavoritesPage() {
	return (
		<Box sx={{p: 4}}>
			<Typography variant="h4" sx={{fontWeight: 700, mb: 1}}>
				Favorites
			</Typography>
			<Typography color="text.secondary">Your favorite restaurants will appear here.</Typography>
		</Box>
	)
}
