import {
	getMenuItemHandler,
	getRestaurantHandler,
	getRestaurantMenuHandler,
	getRestaurantsHandler,
} from '../../controllers/restaurantController'
import {Router} from 'express'
const route = Router()

const restaurants = (app: Router) => {
	app.use('/restaurants', route)
	route.get('/', getRestaurantsHandler)
	route.get('/:slug', getRestaurantHandler)
	route.get('/:slug/menu', getRestaurantMenuHandler)
	route.get('/:slug/items/:uuid', getMenuItemHandler)
}

export default restaurants
