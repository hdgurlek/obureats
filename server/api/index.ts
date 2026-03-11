import {Router} from 'express'
import addresses from './routes/Addresses'
import auth from './routes/Auth'
import carts from './routes/Carts'
import favorites from './routes/Favorites'
import orders from './routes/Orders'
import payments from './routes/Payment'
import restaurants from './routes/Restaurants'
import session from './routes/Session'
import user from './routes/User'
const z = require('zod')

export const routes = () => {
	const router = Router()
	restaurants(router)
	auth(router)
	return router
}

export const protectedRoutes = () => {
	const router = Router()
	user(router)
	carts(router)
	session(router)
	payments(router)
	orders(router)
	addresses(router)
	favorites(router)
	return router
}
