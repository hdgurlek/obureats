'use client'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Button, styled} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Cart from './cart/Cart'

export default function Header() {
	const AppToolbar = styled(Toolbar)(() => ({
		backgroundColor: '#fff',
		height: '2rem',
		minHeight: '1rem',
	}))

	const LogoButton = styled(Button)(() => ({
		textTransform: 'none',
		justifyContent: 'start',
		color: 'black',
		fontSize: '1.2rem',
		'&:hover': {},
	}))

	return (
		<AppBar sx={{flexGrow: 1, marginBottom: 2, height: '4rem'}} position="sticky">
			<AppToolbar>
				<IconButton size="large" sx={{color: '#000'}}>
					<MenuIcon />
				</IconButton>
				<Box sx={{flexGrow: 1}}>
					<LogoButton variant="text" href="/" size="small" disableTouchRipple>
						Obur&nbsp;<strong>Eats</strong>
					</LogoButton>
				</Box>
				<Cart />
			</AppToolbar>
		</AppBar>
	)
}
