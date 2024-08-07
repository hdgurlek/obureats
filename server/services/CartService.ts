import {Cart} from '../api/types/response/Cart'
import CartItems from '../models/CartItems'
import Carts from '../models/Carts'
import Items, {ItemModel} from '../models/Items'

export async function getCart(userId: string) {
	const cartModel = await Carts.findOne({userId: userId}).exec()
	if (!cartModel) {
		throw new Error('Cart not found')
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
