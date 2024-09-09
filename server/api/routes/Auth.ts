import {Router} from 'express'
import {loginHandler, logoutHandler, refreshHandler, registerHandler} from '../../controllers/authController'

const route = Router()

const authRoutes = (app: Router) => {
	app.use('/auth', route)

	route.post('/register', registerHandler)
	route.post('/login', loginHandler)
	route.get('/refresh', refreshHandler)
	route.get('/logout', logoutHandler)
}

export default authRoutes
