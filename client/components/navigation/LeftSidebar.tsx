'use client'

import CloseIcon from '@mui/icons-material/Close'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ListAltIcon from '@mui/icons-material/ListAlt'
import {Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material'
import Link from 'next/link'

interface LeftSidebarProps {
	open: boolean
	onClose: () => void
}

export default function LeftSidebar({open, onClose}: LeftSidebarProps) {
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
				},
			}}
			BackdropProps={{sx: {backgroundColor: 'rgba(0,0,0,0.2)'}}}
		>
			<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2}}>
				<Typography variant="h6" sx={{fontWeight: 700}}>
					Obur Eats
				</Typography>
				<IconButton onClick={onClose} size="small" sx={{color: '#000'}}>
					<CloseIcon />
				</IconButton>
			</Box>
			<Divider />
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
		</Drawer>
	)
}
