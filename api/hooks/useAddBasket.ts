import {useMutation, useQueryClient} from '@tanstack/react-query'
import {getRestaurant} from '../mockApi'

const useAddBasket = (slug: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: getRestaurant,
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['basket', slug]})
		},
	})
}

export default useAddBasket
