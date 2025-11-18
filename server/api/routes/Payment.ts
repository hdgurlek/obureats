import {Router} from 'express'
import {checkoutHandler} from '../../controllers/checkoutController'
import authenticate from '../../middleware/authenticate'
import {paymentStatusHandler} from '../../controllers/paymentStatusController'

const route = Router()

const payments = (app: Router) => {
	app.use('/payments', authenticate, route)
	route.post('/checkout', checkoutHandler)
	route.get('/status', paymentStatusHandler)
}

export default payments
