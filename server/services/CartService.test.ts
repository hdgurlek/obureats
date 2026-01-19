import mongoose, {Types} from 'mongoose'
import {MongoMemoryServer} from 'mongodb-memory-server'
import {addItemToCart, getCart, updateItemInCart} from './CartService'
import Items from '../models/Items'
import Carts from '../models/Carts'
import CartItems from '../models/CartItems'

let mongo: MongoMemoryServer
const userId = new Types.ObjectId()

beforeAll(async () => {
	mongo = await MongoMemoryServer.create()
	const uri = mongo.getUri()
	await mongoose.connect(uri)
})

afterAll(async () => {
	await mongoose.disconnect()
	await mongo.stop()
})

beforeEach(async () => {
	await Items.deleteMany({})
	await Carts.deleteMany({})
	await CartItems.deleteMany({})
})

describe('CartService', () => {
	test('adds item to empty cart', async () => {
		const item = await Items.create({
			uuid: 'item-1',
			name: 'Pizza',
			price: 10,
			restaurantSlug: 'pizza-house',
		})

		await addItemToCart('item-1', 2, userId)

		const cart = await getCart(userId)

		expect(cart.items).toHaveLength(1)
		expect(cart.items[0].quantity).toBe(2)
		expect(cart.totalPrice).toBe(20)
	})

	test('increases quantity if same item added again', async () => {
		await Items.create({
			uuid: 'item-1',
			name: 'Burger',
			price: 5,
			restaurantSlug: 'burger-house',
		})

		await addItemToCart('item-1', 1, userId)
		await addItemToCart('item-1', 2, userId)

		const cart = await getCart(userId)

		expect(cart.items[0].quantity).toBe(3)
		expect(cart.totalPrice).toBe(15)
	})

	test('removes item when quantity is set to 0', async () => {
		await Items.create({
			uuid: 'item-1',
			name: 'Pasta',
			price: 8,
			restaurantSlug: 'italian',
		})

		await addItemToCart('item-1', 1, userId)
		await updateItemInCart('item-1', 0, userId)

		const cart = await getCart(userId)

		expect(cart.items).toHaveLength(0)
		expect(cart.totalPrice).toBe(0)
	})

	test('throws error for invalid quantity', async () => {
		await expect(addItemToCart('item-1', -2, userId)).rejects.toThrow('Invalid quantity')
	})
})
