import {Router} from 'express'
import {
	createAddressHandler,
	deleteAddressHandler,
	getAddressesHandler,
	setDefaultAddressHandler,
	updateAddressHandler,
} from '../../controllers/addressController'
import authenticate from '../../middleware/authenticate'

const route = Router()

const addresses = (app: Router) => {
	app.use('/addresses', authenticate, route)
	route.get('/', getAddressesHandler)
	route.post('/', createAddressHandler)
	route.patch('/:id', updateAddressHandler)
	route.delete('/:id', deleteAddressHandler)
	route.post('/:id/default', setDefaultAddressHandler)
}

export default addresses
