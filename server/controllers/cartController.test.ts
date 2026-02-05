import {addCartHandler, updateCartHandler} from './cartController'
import Orders from '../models/Orders'
import {addItemToCart, getCart, updateItemInCart} from '../services/CartService'
import {getStatus, updatePaymentIntent} from '../services/PaymentService'

jest.mock('../models/Orders', () => ({
	__esModule: true,
	default: {
		findOne: jest.fn(),
	},
}))

jest.mock('../services/CartService', () => ({
	addItemToCart: jest.fn(),
	getCart: jest.fn(),
	updateItemInCart: jest.fn(),
}))

jest.mock('../services/PaymentService', () => ({
	getStatus: jest.fn(),
	updatePaymentIntent: jest.fn(),
}))

function makeRes() {
	const res: any = {}
	res.status = jest.fn().mockReturnValue(res)
	res.json = jest.fn().mockReturnValue(res)
	res.sendStatus = jest.fn().mockReturnValue(res)
	return res
}

function makeNext() {
	return jest.fn()
}

describe('cartController processing guard', () => {
	beforeEach(() => {
		;(Orders.findOne as jest.Mock).mockReset()
		;(addItemToCart as jest.Mock).mockReset()
		;(updateItemInCart as jest.Mock).mockReset()
		;(getCart as jest.Mock).mockReset()
		;(getStatus as jest.Mock).mockReset()
		;(updatePaymentIntent as jest.Mock).mockReset()
	})

	it('blocks addCartHandler when payment is processing', async () => {
		;(Orders.findOne as jest.Mock).mockResolvedValue({paymentIntentId: 'pi_1'})
		;(getStatus as jest.Mock).mockResolvedValue({status: 'processing'})

		const req: any = {userId: 'u1', body: {itemUuid: 'i1', quantity: 1}}
		const res = makeRes()
		const next = makeNext()

		await addCartHandler(req, res, next)

		expect(res.status).toHaveBeenCalledWith(409)
		expect(res.json).toHaveBeenCalledWith({error: 'Payment is processing. Cart changes are disabled.'})
		expect(addItemToCart).not.toHaveBeenCalled()
		expect(updatePaymentIntent).not.toHaveBeenCalled()
	})

	it('blocks updateCartHandler when payment is processing', async () => {
		;(Orders.findOne as jest.Mock).mockResolvedValue({paymentIntentId: 'pi_1'})
		;(getStatus as jest.Mock).mockResolvedValue({status: 'processing'})

		const req: any = {userId: 'u1', body: {itemUuid: 'i1', quantity: 2}}
		const res = makeRes()
		const next = makeNext()

		await updateCartHandler(req, res, next)

		expect(res.status).toHaveBeenCalledWith(409)
		expect(res.json).toHaveBeenCalledWith({error: 'Payment is processing. Cart changes are disabled.'})
		expect(updateItemInCart).not.toHaveBeenCalled()
		expect(updatePaymentIntent).not.toHaveBeenCalled()
	})

	it('updates order items when cart changes', async () => {
		const pendingOrder = {
			paymentIntentId: 'pi_1',
			items: [],
			totalPrice: 0,
			save: jest.fn(),
		}
		;(Orders.findOne as jest.Mock).mockResolvedValue(pendingOrder)
		;(getStatus as jest.Mock).mockResolvedValue({status: 'requires_payment_method'})
		;(getCart as jest.Mock).mockResolvedValue({
			items: [{itemUuid: 'i1', name: 'Item', quantity: 2, price: 10}],
			totalPrice: 20,
			restaurantSlug: 'r1',
		})
		;(updatePaymentIntent as jest.Mock).mockResolvedValue({id: 'pi_1'})

		const req: any = {userId: 'u1', body: {itemUuid: 'i1', quantity: 2}}
		const res = makeRes()
		const next = makeNext()

		await updateCartHandler(req, res, next)

		expect(updateItemInCart).toHaveBeenCalled()
		expect(updatePaymentIntent).toHaveBeenCalledWith('pi_1', {
			amount: 20,
			metadata: {restaurantSlug: 'r1', updatedAt: expect.any(String)},
		})
		expect(pendingOrder.items).toEqual([{itemUuid: 'i1', name: 'Item', quantity: 2, price: 10}])
		expect(pendingOrder.totalPrice).toBe(20)
		expect(pendingOrder.save).toHaveBeenCalled()
	})
})
