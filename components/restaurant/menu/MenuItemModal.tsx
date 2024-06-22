'use client'

import useMenuItem from '@/api/hooks/useMenuItem'
import {getMenuItem} from '@/api/mockApi'
import {MenuItem} from '@/types/Menu'
import {Box, Modal, CardMedia, styled, Typography, Button} from '@mui/material'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

const style = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 968,
	height: 644,
	bgcolor: 'background.paper',
	boxShadow: 24,
	borderRadius: '1rem',
	p: 4,
	gap: 2,
}

const style1 = {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	height: 600,
	bgcolor: 'background.paper',
	p: 0,
}

const ItemImage = styled(CardMedia)(() => ({
	component: 'img',
	alt: 'item-img',
	height: 600,
	width: '100%',
}))

const PriceText = styled(Typography)(() => ({
	color: 'gray',
}))

const AddButton = styled(Button)(() => ({
	backgroundColor: '#000',
	alignSelf: 'end',
}))

interface MenuItemModalProps {
	slug: string
	itemId: string
}

export default function MenuItemModal({slug, itemId}: MenuItemModalProps) {
	const router = useRouter()

	const {data: menuItem, isLoading: isMenuItemLoading} = useMenuItem(slug, itemId)

	return (
		<Modal
			open={true}
			onClose={() => {
				router.back()
			}}
		>
			<Box sx={style}>
				{isMenuItemLoading && <div>Loading...</div>}
				{!isMenuItemLoading && !menuItem && <div>Item not found</div>}
				{!isMenuItemLoading && menuItem && (
					<>
						<ItemImage image={menuItem.image} />
						<Box sx={style1}>
							<Typography variant="h4">{menuItem.name}</Typography>
							<PriceText variant="h5">{menuItem.price}</PriceText>
							<Typography>Details</Typography>
							<AddButton variant="contained">Add 1 to Order</AddButton>
						</Box>
					</>
				)}
			</Box>
		</Modal>
	)
}
