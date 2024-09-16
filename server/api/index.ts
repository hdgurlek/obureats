import {Router} from 'express'
import restaurants from './routes/Restaurants'
import carts from './routes/Carts'
import auth from './routes/Auth'
import user from './routes/User'
import session from './routes/Session'
const z = require('zod')

export const routes = () => {
	const router = Router()
	restaurants(router)
	carts(router)
	auth(router)

	return router
}

export const protectedRoutes = () => {
	const router = Router()
	user(router)
	session(router)
	return router
}
