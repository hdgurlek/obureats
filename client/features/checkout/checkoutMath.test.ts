import {calcSubtotal, formatEuro, calcItemsCount} from './checkoutMath'

describe('checkoutMath', () => {
	test('when items are present, calculates subtotal', () => {
		const items = [
			{itemUuid: '1', name: 'A', quantity: 2, price: 3.5},
			{itemUuid: '2', name: 'B', quantity: 1, price: 10},
		]

		const result = calcSubtotal(items)

		expect(result).toBe(17)
	})

	test('when no items are present, subtotal is zero', () => {
		const result = calcSubtotal([])
		expect(result).toBe(0)
	})

	test('formats euro amounts correctly', () => {
		expect(formatEuro(5)).toBe('€5.00')
		expect(formatEuro(3.456)).toBe('€3.46')
		expect(formatEuro(0)).toBe('€0.00')
	})

	test('calculates total item count correctly', () => {
		const items = [
			{itemUuid: '1', name: 'A', quantity: 2, price: 3.5},
			{itemUuid: '2', name: 'B', quantity: 1, price: 10},
			{itemUuid: '3', name: 'C', quantity: 4, price: 2},
		]

		const result = calcItemsCount(items)

		expect(result).toBe(7)
	})

	test('when no items are present, item count is zero', () => {
		const result = calcItemsCount([])
		expect(result).toBe(0)
	})
})
