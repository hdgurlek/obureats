import {Router} from 'express'
import restaurants from './routes/Restaurants'
import carts from './routes/Carts'
import authRoutes from './routes/Auth'
const z = require('zod')

const routes = () => {
	const app = Router()
	restaurants(app)
	carts(app)
	authRoutes(app)
	return app
}

export default routes
