import {Router} from 'express'
import authenticate from '../../middleware/authenticate'
import {addFavoriteHandler, getFavoritesHandler, removeFavoriteHandler} from '../../controllers/favoritesController'

const route = Router()

const favorites = (app: Router) => {
	app.use('/favorites', authenticate, route)
	route.get('/', getFavoritesHandler)
	route.post('/:slug', addFavoriteHandler)
	route.delete('/:slug', removeFavoriteHandler)
}

export default favorites

