'use client'

import CloseIcon from '@mui/icons-material/Close'
import LogoutIcon from '@mui/icons-material/Logout'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ListAltIcon from '@mui/icons-material/ListAlt'
import LoginIcon from '@mui/icons-material/Login'
import useLogout from '@/api/hooks/useLogout'
import useUser from '@/api/hooks/useUser'
import {Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useCallback, useMemo} from 'react'

interface LeftSidebarProps {
	open: boolean
	onClose: () => void
}

export default function LeftSidebar({open, onClose}: LeftSidebarProps) {
	const user = useUser()
	const {mutateAsync: logout, isPending: isLoggingOut} = useLogout()
	const isLoggedIn = Boolean(user.data?.email)
	const router = useRouter()

	const displayName = useMemo(() => {
		const email = user.data?.email
		if (!email) return 'Guest'
		const localPart = email.split('@')[0] || email
		return localPart
	}, [user.data?.email])

	const avatarLetter = useMemo(() => displayName.trim().charAt(0).toUpperCase() || 'G', [displayName])

	const onLogout = useCallback(async () => {
		await logout()
		router.push('/')
		onClose()
	}, [logout, onClose, router])

	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					width: 280,
					backgroundColor: '#ffffff',
					color: '#000000',
					borderRight: '1px solid #e5e5e5',
					display: 'flex',
					flexDirection: 'column',
				},
			}}
			BackdropProps={{sx: {backgroundColor: 'rgba(0,0,0,0.2)'}}}
		>
			<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, pb: 1.5}}>
				<Typography variant="h6" sx={{fontWeight: 700}}>
					Obur Eats
				</Typography>
				<IconButton onClick={onClose} size="small" sx={{color: '#000'}}>
					<CloseIcon />
				</IconButton>
			</Box>

			<Box sx={{px: 2, pb: 2}}>
				<Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}>
					<Avatar sx={{width: 34, height: 34, bgcolor: '#000', color: '#fff', fontWeight: 700}}>{avatarLetter}</Avatar>
					<Box sx={{minWidth: 0}}>
						<Typography variant="subtitle2" sx={{fontWeight: 700, lineHeight: 1.2}} noWrap>
							{displayName}
						</Typography>
						<Typography variant="caption" color="text.secondary" noWrap>
							{isLoggedIn ? user.data?.email : 'Not signed in'}
						</Typography>
					</Box>
				</Box>
			</Box>
			<Divider />
			<Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
				{isLoggedIn ? (
					<List sx={{p: 1}}>
						<ListItem disablePadding>
							<ListItemButton component={Link} href="/orders" onClick={onClose}>
								<ListItemIcon sx={{minWidth: 40, color: '#000'}}>
									<ListAltIcon />
								</ListItemIcon>
								<ListItemText primary="Orders" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton component={Link} href="/favorites" onClick={onClose}>
								<ListItemIcon sx={{minWidth: 40, color: '#000'}}>
									<FavoriteBorderIcon />
								</ListItemIcon>
								<ListItemText primary="Favorites" />
							</ListItemButton>
						</ListItem>
					</List>
				) : null}

				<Box sx={{mt: 'auto'}}>
					<Divider />
					<Box sx={{p: 1.5}}>
						{isLoggedIn ? (
							<Button
								fullWidth
								variant="contained"
								disableElevation
								startIcon={<LogoutIcon />}
								onClick={onLogout}
								disabled={isLoggingOut}
								sx={{
									textTransform: 'none',
									backgroundColor: '#000',
									color: '#fff',
									'&:hover': {backgroundColor: '#262626'},
								}}
							>
								Log out
							</Button>
						) : (
							<Button
								component={Link}
								href="/login"
								fullWidth
								variant="contained"
								disableElevation
								startIcon={<LoginIcon />}
								onClick={onClose}
								sx={{
									textTransform: 'none',
									backgroundColor: '#000',
									color: '#fff',
									'&:hover': {backgroundColor: '#262626'},
								}}
							>
								Log in
							</Button>
						)}
					</Box>
				</Box>
			</Box>
		</Drawer>
	)
}
