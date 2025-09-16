import {Types} from 'mongoose'
import {Cart} from '../api/types/response/Cart'
import CartItems from '../models/CartItems'
import Carts from '../models/Carts'
import Items, {ItemModel} from '../models/Items'

export async function getCart(userId: Types.ObjectId): Promise<Cart> {
	const cartModel = await Carts.findOne({userId: userId}).exec()

	if (!cartModel) {
		return {restaurantSlug: undefined, items: [], totalPrice: undefined} as Cart
	}

	const cartItemModels = await CartItems.find({cart: cartModel._id}).populate<{item: ItemModel}>({path: 'item'}).exec()
	let totalPrice: number = 0

	const cartItems = cartItemModels.map(cartItemModel => {
		const item = {
			name: cartItemModel.item.name,
			quantity: cartItemModel.quantity,
			price: cartItemModel.item.price,
			itemUuid: cartItemModel.item.uuid,
		}
		totalPrice += item.quantity * item.price
		return item
	})

	return {restaurantSlug: cartModel.restaurantSlug, items: cartItems, totalPrice: totalPrice} as Cart
}

export async function addItemToCart(itemUuid: string, quantity: number, userId: Types.ObjectId) {
	const item = await Items.findOne({uuid: itemUuid}).exec()
	if (!item) {
		throw new Error('Item not found')
	}

	let cart = await Carts.findOne({userId: userId}).exec()
	console.log(`Add item to cart with user id: ${userId}`)

	const restaurantSlug = item.restaurantSlug

	if (!cart || cart.restaurantSlug !== restaurantSlug) {
		if (cart) {
			await CartItems.deleteMany({cart: cart._id})
			await Carts.deleteOne({userId}).exec()
		}
		cart = await Carts.create({userId, restaurantSlug})
	}

	let cartItem = await CartItems.findOne({cart: cart._id, item: item._id})

	if (!cartItem) {
		cartItem = await CartItems.create({cart: cart._id, item: item._id, quantity: quantity})
		console.log('add item create')
	} else {
		cartItem.quantity += Number(quantity)
		await cartItem.save()
	}
}

export async function updateItemInCart(itemUuid: string, quantity: number, userId: Types.ObjectId) {
	const item = await Items.findOne({uuid: itemUuid}).exec()
	if (!item) {
		throw new Error('Item not found')
	}

	let cart = await Carts.findOne({userId: userId}).orFail().exec()

	const filter = {cart: cart._id, item: item._id}
	const update = {quantity: quantity}

	if (quantity === 0) {
		await CartItems.findOneAndDelete({cart: cart._id, item: item._id})
	} else {
		let cartItem = await CartItems.findOne({cart: cart._id, item: item._id})
		if (cartItem) {
			cartItem.quantity = quantity
			cartItem.save()
		}
	}
}
