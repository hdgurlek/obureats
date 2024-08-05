import {Router} from 'express'
import restaurants from './routes/Restaurants'
import carts from './routes/Carts'

const routes = () => {
	const app = Router()
	restaurants(app)
	carts(app)
	return app
}

export default routes
