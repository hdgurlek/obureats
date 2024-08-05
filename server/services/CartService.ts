import {Cart} from '../api/types/response/Cart'
import CartItems from '../models/CartItems'
import Carts from '../models/Carts'
import Items from '../models/Items'

export async function getCart(userId: string) {
	const cartModel = await Carts.findOne({userId: userId}).exec()
	if (!cartModel) {
		throw new Error('Cart not found')
	}
	const cartItemModels = await CartItems.find({cart: cartModel._id}).exec()
	let totalPrice: number = 0

	const cartItems = await Promise.all(
		cartItemModels.map(async cartItemModel => {
			const itemModel = await Items.findOne({_id: cartItemModel.item._id}).exec()

			if (!itemModel) {
				throw new Error('Item not found')
			}

			const item = {
				name: itemModel.name,
				quantity: cartItemModel.quantity,
				price: itemModel.price,
				itemUuid: itemModel.uuid,
			}
			totalPrice += item.quantity * item.price
			return item
		})
	)

	return {restaurantSlug: cartModel.restaurantSlug, items: cartItems, totalPrice: totalPrice} as Cart
}

export async function addItemToCart(itemUuid: string, quantity: number, userId: string) {
	const item = await Items.findOne({uuid: itemUuid}).exec()
	if (!item) {
		throw new Error('Item not found')
	}

	let cart = await Carts.findOne({userId: userId}).exec()
	const restaurantSlug = item.restaurantSlug

	// TODO remove previous cart if one exists with a different slug
	if (!cart) {
		cart = await Carts.create({userId: userId, restaurantSlug: restaurantSlug})
	}

	let cartItem = await CartItems.findOne({cart: cart._id, item: item._id})

	if (!cartItem) {
		cartItem = await CartItems.create({cart: cart._id, item: item._id, quantity: quantity})
	} else {
		cartItem.quantity += Number(quantity)
		await cartItem.save()
	}
}
