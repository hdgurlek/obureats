import {deleteSessionHandler, getSessionsHandler} from '../../controllers/sessionController'
import {Router} from 'express'
import authenticate from '../../middleware/authenticate'

const route = Router()

const session = (app: Router) => {
	app.use('/sessions', authenticate, route)
	route.get('/', getSessionsHandler)
	route.delete('/:id', deleteSessionHandler)
}

export default session
