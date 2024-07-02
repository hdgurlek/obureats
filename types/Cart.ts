export type Cart = {
	restaurantSlug: string
	items: CartItem[]
	totalPrice?: number
}
export type CartItem = {
	name: string
	quantity: number
	price: number
	uuid: string
}
