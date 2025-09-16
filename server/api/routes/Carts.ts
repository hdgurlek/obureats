import {Router} from 'express'
import {addCartHandler, getCartHandler, updateCartHandler} from '../../controllers/cartController'
import authenticate from '../../middleware/authenticate'

const route = Router()

const carts = (app: Router) => {
	app.use('/carts', authenticate, route)
	route.get('/', getCartHandler)
	route.post('/items/add', addCartHandler)
	route.post('/items/update', updateCartHandler)
}

export default carts
