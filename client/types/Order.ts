export type OrderItem = {
	itemUuid: string
	name: string
	quantity: number
	price: number
}

export type CheckoutOrder = {
	id: string
	items: OrderItem[]
	totalPrice: number
}

export type OrderHistoryOrder = {
	id: string
	items: OrderItem[]
	totalPrice: number
	restaurantSlug: string
	restaurantName: string
	restaurantImage: string | null
	createdAt: string
	paymentStatus: 'PAID'
}
