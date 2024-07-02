import {useMutation, useQueryClient} from '@tanstack/react-query'
import {addItemToCart} from '../mockApi'

const useAddItemToCart = (restaurantSlug: string, uuid: string, quantity: number) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => addItemToCart(restaurantSlug, uuid, quantity),
		mutationKey: ['add-to-cart'],
		onSuccess: () => {
			console.log('invalidate')
			queryClient.invalidateQueries({queryKey: ['cart']})
		},
	})
}

export default useAddItemToCart
