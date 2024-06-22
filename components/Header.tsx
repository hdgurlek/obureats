'use client'
import {ShoppingCartOutlined} from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import {styled} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'

export default function Header() {
	const ToolbarStyled = styled(Toolbar)(() => ({
		backgroundColor: '#fff',
	}))

	return (
		<AppBar sx={{flexGrow: 1, marginBottom: 5}} position="sticky">
			<ToolbarStyled>
				<IconButton size="large" sx={{mr: 2}}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" color="black" sx={{flexGrow: 1}}>
					Obur Eats
				</Typography>
				{
					// implement shopping cart component
					<>
						<IconButton size="large" color="inherit">
							<ShoppingCartOutlined style={{color: 'black'}} />
						</IconButton>
					</>
				}
			</ToolbarStyled>
		</AppBar>
	)
}
