import authenticate from '../../middleware/authenticate'
import {getUserHandler} from '../../controllers/userController'
import {Router} from 'express'

const route = Router()

const user = (app: Router) => {
	app.use('/user', authenticate, route)
	route.get('/', getUserHandler)
}

export default user
