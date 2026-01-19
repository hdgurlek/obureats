import {OrderItem} from '@/features/checkout/types/OrderItem'

export function calcSubtotal(items: OrderItem[] = []): number {
	return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function formatEuro(amount: number): string {
	return `€${amount.toFixed(2)}`
}

export function calcItemsCount(items: OrderItem[] = []): number {
	return items.reduce((sum, item) => sum + item.quantity, 0)
}
