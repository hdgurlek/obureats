import {Router} from 'express'
import {getRestaurants, getRestaurant} from '../../services/RestaurantService'
import {getRestaurantMenu, getRestaurantMenuItem} from '../../services/MenuService'
const route = Router()

const restaurants = (app: Router) => {
	app.use('/restaurants', route)

	route.get('/', async (req, res) => {
		const restaurants = await getRestaurants()
		res.send(restaurants)
	})

	route.get('/:slug', async (req, res) => {
		const slug = req.params.slug
		const restaurant = await getRestaurant(slug)
		res.send(restaurant)
	})

	route.get('/:slug/menu', async (req, res) => {
		const slug = req.params.slug
		const menu = await getRestaurantMenu(slug)
		res.send(menu)
	})

	route.get('/:slug/items/:uuid', async (req, res) => {
		const slug = req.params.slug
		const uuid = req.params.uuid
		const item = await getRestaurantMenuItem(slug, uuid)
		res.send(item)
	})
}

export default restaurants
