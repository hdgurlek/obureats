import {Router} from 'express'
import {getOrderHistoryHandler} from '../../controllers/ordersController'
import authenticate from '../../middleware/authenticate'

const route = Router()

const orders = (app: Router) => {
	app.use('/orders', authenticate, route)
	route.get('/history', getOrderHistoryHandler)
}

export default orders
