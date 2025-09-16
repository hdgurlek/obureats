import {Cart} from '@/types/Cart'
import {Menu, MenuItem} from '@/types/Menu'
import {Restaurant} from '@/types/Restaurant'

const API_URL = `/api/proxy?url=${process.env.NEXT_PUBLIC_API_URL}`

export async function getRestaurants(): Promise<Restaurant[]> {
	const response = await fetch(`${API_URL}/restaurants`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function getRestaurant(slug: string): Promise<Restaurant> {
	const response = await fetch(`${API_URL}/restaurants/${slug}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function getRestaurantMenu(slug: string): Promise<Menu> {
	const response = await fetch(`${API_URL}/restaurants/${slug}/menu`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function getMenuItem(slug: string, itemUuid: string): Promise<MenuItem> {
	const response = await fetch(`${API_URL}/restaurants/${slug}/items/${itemUuid}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function getCart(): Promise<Cart> {
	const response = await fetch(`${API_URL}/carts`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function addItemToCart(itemUuid: string, quantity: number) {
	await fetch(`${API_URL}/carts/items/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			itemUuid,
			quantity,
		}),
	})
}

export async function updateItemInCart(itemUuid: string, quantity: number) {
	await fetch(`${API_URL}/carts/items/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			itemUuid,
			quantity,
		}),
	})
}

export async function login(email: string, password: string) {
	const response = await fetch(`http://localhost:3001/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	})

	return await response.json()
}
