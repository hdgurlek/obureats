import type {Metadata} from 'next'
import ReactQueryProvider from './ReactQueryProvider'
import Header from '@/components/header/Header'
import theme from '@/styles/Theme'
import {ThemeProvider} from '@mui/material/styles'

export const metadata: Metadata = {
	title: 'Obur Eats',
	description: 'Food Delivery Platform',
}

export default function RootLayout(props: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<ThemeProvider theme={theme}>
				<ReactQueryProvider>
					<body style={{margin: 0}}>
						<Header />
						{props.children}
					</body>
				</ReactQueryProvider>
			</ThemeProvider>
		</html>
	)
}
