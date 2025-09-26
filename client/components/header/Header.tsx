'use client'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Button, styled} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Cart from './cart/Cart'
import {useCallback, useState} from 'react'
import useLogin from '@/api/hooks/useLogin'
import useUser from '@/api/hooks/useUser'

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

	const user = useUser()

	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const email: string = 'test1@test.com'
	const password: string = '123123'
	const {mutateAsync: login} = useLogin(email, password)

	const onLogin = useCallback(async () => {
		await login()
		setIsLoggedIn(true)
	}, [login])

	const onLogout = () => {
		setIsLoggedIn(false)
	}

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
				{isLoggedIn ? (
					<>
						<Cart />
						<button onClick={onLogout}>Log Out</button>
					</>
				) : (
					<button onClick={onLogin}>Log In</button>
				)}
			</AppToolbar>
		</AppBar>
	)
}
