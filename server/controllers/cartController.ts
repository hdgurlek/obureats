import {OK} from '../constants/http'
import {addItemToCart, getCart, updateItemInCart} from '../services/CartService'
import catchErrors from '../utils/catchErrors'

export const getCartHandler = catchErrors(async (req, res) => {
	const cart = await getCart(req.userId)
	return res.status(OK).json(cart)
})

export const addCartHandler = catchErrors(async (req, res) => {
	const {itemUuid, quantity} = req.body
	await addItemToCart(itemUuid, quantity, req.userId)
	res.sendStatus(OK)
})

export const updateCartHandler = catchErrors(async (req, res) => {
	const {itemUuid, quantity} = req.body
	await updateItemInCart(itemUuid, quantity, req.userId)
	res.sendStatus(OK)
})
