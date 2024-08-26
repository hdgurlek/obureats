import {Router} from 'express'
import {registerHandler} from '../../controllers/authController'

const route = Router()

const authRoutes = (app: Router) => {
	app.use('/auth', route)

	route.post('/register', registerHandler)
}

export default authRoutes
