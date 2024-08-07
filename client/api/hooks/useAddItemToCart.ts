import {useMutation, useQueryClient} from '@tanstack/react-query'
import {addItemToCart} from '../api'

const useAddItemToCart = (itemUuid: string, quantity: number) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => addItemToCart(itemUuid, quantity),
		mutationKey: ['add-to-cart'],
		onSuccess: () => {
			console.log('invalidate')
			queryClient.invalidateQueries({queryKey: ['cart']})
		},
	})
}

export default useAddItemToCart
