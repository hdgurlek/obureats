'use client'
import RestaurantGrid from '@/components/home/RestaurantGrid'
import styles from '@/styles/page.module.css'
import {createTheme} from '@mui/material'
import {ThemeProvider} from 'styled-components'

const theme = createTheme({
	typography: {
		fontSize: 14,
		fontFamily: 'Arial',
	},
})

export default function Home() {
	return (
		<ThemeProvider theme={theme}>
			<main className={styles.main}>
				<div className={styles.center}>
					<RestaurantGrid />
				</div>
			</main>
		</ThemeProvider>
	)
}
