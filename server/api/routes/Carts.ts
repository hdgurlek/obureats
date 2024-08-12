import {Router} from 'express'
import {addItemToCart, getCart, updateItemInCart} from '../../services/CartService'
const route = Router()

const carts = (app: Router) => {
	app.use('/carts', route)
	const userId = '1' // TODO

	route.get('/', async (req, res) => {
		const cart = await getCart(userId)
		res.send(cart)
	})

	route.post('/items/add', async (req, res) => {
		const {itemUuid, quantity} = req.body
		await addItemToCart(itemUuid, quantity, userId)
		res.sendStatus(200)
	})

	route.post('/items/update', async (req, res) => {
		const {itemUuid, quantity} = req.body
		await updateItemInCart(itemUuid, quantity, userId)
		res.sendStatus(200)
	})
}

export default carts
