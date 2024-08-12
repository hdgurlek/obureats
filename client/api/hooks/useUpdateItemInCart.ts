import {useMutation, useQueryClient} from '@tanstack/react-query'
import {updateItemInCart} from '../api'

const useUpdateItemInCart = (itemUuid: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (value: number) => updateItemInCart(itemUuid, value),
		mutationKey: ['update-item-in-cart'],
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['cart']})
		},
	})
}

export default useUpdateItemInCart
