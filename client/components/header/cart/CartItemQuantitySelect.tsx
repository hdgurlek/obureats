import useUpdateItemInCart from '@/api/hooks/useUpdateItemInCart'
import {CartItem} from '@/types/Cart'
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material'
import {useState} from 'react'

interface CartItemQuantitySelectProps {
	item: CartItem
}

export default function CartItemQuantitySelect(props: CartItemQuantitySelectProps) {
	const [quantity, setQuantity] = useState(props.item.quantity)
	const {mutate: updateItemInCart} = useUpdateItemInCart(props.item.itemUuid)

	const handleChange = (event: SelectChangeEvent) => {
		const newQuantity = Number(event.target.value)
		setQuantity(newQuantity)
		updateItemInCart(newQuantity)
	}

	return (
		<FormControl sx={{m: 1, minWidth: 60}}>
			<Select
				labelId="cart-item-select-label"
				id="demo-simple-select"
				value={quantity.toString()}
				onChange={handleChange}
			>
				{Array.from({length: 11}, (_, index) => (
					<MenuItem key={index} value={index}>
						{index === 0 ? 'Remove' : index}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}
