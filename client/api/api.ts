import {apiFetch} from '@/lib/apiClient'
import {AddressInput, CheckoutPayload, UpdateAddressInput, UserAddress} from '@/types/Address'
import {Cart} from '@/types/Cart'
import {Menu, MenuItem} from '@/types/Menu'
import {CheckoutOrder, OrderHistoryOrder} from '@/types/Order'
import {Restaurant} from '@/types/Restaurant'
import {User} from '@/types/User'

const API_URL = `/api/proxy?url=${process.env.NEXT_PUBLIC_API_URL}`

export async function getRestaurants(): Promise<Restaurant[]> {
	const response = await apiFetch(`${API_URL}/restaurants`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function getRestaurant(slug: string): Promise<Restaurant> {
	const response = await apiFetch(`${API_URL}/restaurants/${slug}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function getRestaurantMenu(slug: string): Promise<Menu> {
	const response = await apiFetch(`${API_URL}/restaurants/${slug}/menu`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function getMenuItem(slug: string, itemUuid: string): Promise<MenuItem> {
	const response = await apiFetch(`${API_URL}/restaurants/${slug}/items/${itemUuid}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function getCart(): Promise<Cart> {
	const response = await apiFetch(`${API_URL}/carts`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function addItemToCart(itemUuid: string, quantity: number) {
	await apiFetch(`${API_URL}/carts/items/add`, {
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
	await apiFetch(`${API_URL}/carts/items/update`, {
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
	const response = await apiFetch(`${API_URL}/auth/login`, {
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

export async function logout(): Promise<{message: string}> {
	const response = await apiFetch(`${API_URL}/auth/logout`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function getUser(): Promise<User> {
	const response = await apiFetch(`${API_URL}/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function checkout(payload?: CheckoutPayload): Promise<{clientSecret: string; order: CheckoutOrder}> {
	const response = await apiFetch(`${API_URL}/payments/checkout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: payload ? JSON.stringify(payload) : undefined,
		credentials: 'include',
	})

	return await response.json()
}

export async function getPaymentStatus(paymentIntentId: string): Promise<{status: string}> {
	const response = await apiFetch(`${API_URL}/payments/status?pi=${paymentIntentId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return await response.json()
}

export async function getOrderHistory(): Promise<{orders: OrderHistoryOrder[]}> {
	const response = await apiFetch(`${API_URL}/orders/history`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		const message = response.status === 401 ? 'Please log in to view your orders.' : 'Failed to load order history.'
		throw new Error(message)
	}

	return await response.json()
}

export async function getAddresses(): Promise<{addresses: UserAddress[]}> {
	const response = await apiFetch(`${API_URL}/addresses`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		throw new Error('Failed to load addresses.')
	}

	return await response.json()
}

export async function createAddress(payload: AddressInput): Promise<{address: UserAddress}> {
	const response = await apiFetch(`${API_URL}/addresses`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})

	if (!response.ok) {
		throw new Error('Failed to create address.')
	}

	return await response.json()
}

export async function updateAddress(id: string, payload: UpdateAddressInput): Promise<{address: UserAddress}> {
	const response = await apiFetch(`${API_URL}/addresses/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})

	if (!response.ok) {
		throw new Error('Failed to update address.')
	}

	return await response.json()
}

export async function deleteAddress(id: string): Promise<void> {
	const response = await apiFetch(`${API_URL}/addresses/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		throw new Error('Failed to delete address.')
	}
}

export async function setDefaultAddress(id: string): Promise<{address: UserAddress}> {
	const response = await apiFetch(`${API_URL}/addresses/${id}/default`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		throw new Error('Failed to set default address.')
	}

	return await response.json()
}

export async function getFavorites(): Promise<{restaurants: Restaurant[]}> {
	const response = await apiFetch(`${API_URL}/favorites`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		const message = response.status === 401 ? 'Please log in to view favorites.' : 'Failed to load favorites.'
		throw new Error(message)
	}

	return await response.json()
}

export async function addFavorite(slug: string): Promise<void> {
	const response = await apiFetch(`${API_URL}/favorites/${slug}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		const message = response.status === 401 ? 'Please log in to favorite restaurants.' : 'Failed to favorite restaurant.'
		throw new Error(message)
	}
}

export async function removeFavorite(slug: string): Promise<void> {
	const response = await apiFetch(`${API_URL}/favorites/${slug}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		const message =
			response.status === 401 ? 'Please log in to manage favorites.' : 'Failed to remove favorite restaurant.'
		throw new Error(message)
	}
}
