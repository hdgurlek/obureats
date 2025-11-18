import {useMutation, useQueryClient} from '@tanstack/react-query'
import {addItemToCart} from '../api'

const useAddItemToCart = (itemUuid: string, quantity: number) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => addItemToCart(itemUuid, quantity),
		mutationKey: ['add-to-cart'],
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['cart']})
		},
		onError: (error: unknown) => {
			console.error('Failed to add item to cart:', error)
		},
	})
}

export default useAddItemToCart
