'use client'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Button, styled} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Cart from './cart/Cart'
import {useState} from 'react'
import useUser from '@/api/hooks/useUser'
import LeftSidebar from '../navigation/LeftSidebar'

export default function Header() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
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

	const user = useUser()

	const isLoggedIn = Boolean(user.data?.email)

	return (
		<AppBar sx={{flexGrow: 1, marginBottom: 2, height: '3rem'}} position="sticky">
			<AppToolbar>
				<IconButton size="large" sx={{color: '#000'}} onClick={() => setIsSidebarOpen(true)}>
					<MenuIcon />
				</IconButton>
				<Box sx={{flexGrow: 1}}>
					<LogoButton variant="text" href="/" size="small" disableTouchRipple>
						Obur&nbsp;<strong>Eats</strong>
					</LogoButton>
				</Box>
				{isLoggedIn ? (
					<>
						<Cart />
					</>
				) : (
					<Button
						href="/login"
						variant="outlined"
						size="small"
						sx={{
							color: '#000',
							borderColor: '#000',
							textTransform: 'none',
							'&:hover': {borderColor: '#000', backgroundColor: 'rgba(0,0,0,0.04)'},
						}}
					>
						Log In
					</Button>
				)}
			</AppToolbar>
			<LeftSidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
		</AppBar>
	)
}
