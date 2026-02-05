import {checkoutHandler} from './checkoutController'
import {createPaymentIntent} from '../services/PaymentService'
import {getCart} from '../services/CartService'
import Orders from '../models/Orders'

jest.mock('stripe', () => {
	const retrieveMock = jest.fn()
	const cancelMock = jest.fn()
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			paymentIntents: {
				retrieve: retrieveMock,
				cancel: cancelMock,
			},
		})),
		__mock: {retrieveMock, cancelMock},
	}
})

const stripeMock = jest.requireMock('stripe') as {__mock: {retrieveMock: jest.Mock; cancelMock: jest.Mock}}
const retrieveMock = stripeMock.__mock.retrieveMock
const cancelMock = stripeMock.__mock.cancelMock

jest.mock('../services/PaymentService', () => ({
	createPaymentIntent: jest.fn(),
}))

jest.mock('../services/CartService', () => ({
	getCart: jest.fn(),
}))

jest.mock('../models/Orders', () => ({
	__esModule: true,
	default: {
		findOne: jest.fn(),
		create: jest.fn(),
	},
}))

function makeRes() {
	const res: any = {}
	res.status = jest.fn().mockReturnValue(res)
	res.json = jest.fn().mockReturnValue(res)
	return res
}

function makeNext() {
	return jest.fn()
}

describe('checkoutHandler processing PaymentIntent behavior', () => {
	beforeEach(() => {
		retrieveMock.mockReset()
		cancelMock.mockReset()
		;(createPaymentIntent as jest.Mock).mockReset()
		;(getCart as jest.Mock).mockReset()
		;(Orders.findOne as jest.Mock).mockReset()
		;(Orders.create as jest.Mock).mockReset()
	})

	it('reuses processing PaymentIntent when it is fresh', async () => {
		const nowMs = 1_700_000_000_000
		jest.spyOn(Date, 'now').mockReturnValue(nowMs)
		const nowSeconds = Math.floor(nowMs / 1000)

		;(getCart as jest.Mock).mockResolvedValue({
			items: [{itemUuid: 'i1', name: 'Item', quantity: 1, price: 10}],
			totalPrice: 10,
			restaurantSlug: 'r1',
		})

		const order = { _id: 'o1', items: [], totalPrice: 10, paymentIntentId: 'pi_1', save: jest.fn() }
		;(Orders.findOne as jest.Mock).mockResolvedValue(order)

		retrieveMock.mockResolvedValue({
			id: 'pi_1',
			status: 'processing',
			client_secret: 'cs_existing',
			created: nowSeconds - 60,
		})

		const req: any = {userId: 'u1'}
		const res = makeRes()
		const next = makeNext()

		await checkoutHandler(req, res, next)

		expect(cancelMock).not.toHaveBeenCalled()
		expect(createPaymentIntent).not.toHaveBeenCalled()
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.json).toHaveBeenCalledWith({
			clientSecret: 'cs_existing',
			order: {
				id: order._id,
				items: order.items,
				totalPrice: order.totalPrice,
			},
		})
		;(Date.now as jest.Mock).mockRestore()
	})

	it('cancels and recreates PaymentIntent when processing is stale', async () => {
		const nowMs = 1_700_000_000_000
		jest.spyOn(Date, 'now').mockReturnValue(nowMs)
		const nowSeconds = Math.floor(nowMs / 1000)

		;(getCart as jest.Mock).mockResolvedValue({
			items: [{itemUuid: 'i1', name: 'Item', quantity: 1, price: 10}],
			totalPrice: 10,
			restaurantSlug: 'r1',
		})

		const order = { _id: 'o1', items: [], totalPrice: 10, paymentIntentId: 'pi_1', save: jest.fn() }
		;(Orders.findOne as jest.Mock).mockResolvedValue(order)

		retrieveMock.mockResolvedValue({
			id: 'pi_1',
			status: 'processing',
			client_secret: 'cs_existing',
			created: nowSeconds - 301,
		})

		cancelMock.mockResolvedValue({id: 'pi_1'})
		;(createPaymentIntent as jest.Mock).mockResolvedValue({
			id: 'pi_new',
			client_secret: 'cs_new',
		})

		const req: any = {userId: 'u1'}
		const res = makeRes()
		const next = makeNext()

		await checkoutHandler(req, res, next)

		expect(cancelMock).toHaveBeenCalledWith('pi_1')
		expect(createPaymentIntent).toHaveBeenCalledWith(10, {
			metadata: {userId: 'u1', restaurantSlug: 'r1'},
		})
		expect(order.paymentIntentId).toBe('pi_new')
		expect(order.save).toHaveBeenCalled()
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.json).toHaveBeenCalledWith({
			clientSecret: 'cs_new',
			order: {
				id: order._id,
				items: order.items,
				totalPrice: order.totalPrice,
			},
		})
		;(Date.now as jest.Mock).mockRestore()
	})
})
