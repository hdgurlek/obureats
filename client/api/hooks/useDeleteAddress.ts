import {useMutation, useQueryClient} from '@tanstack/react-query'
import {deleteAddress} from '../api'

const useDeleteAddress = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (id: string) => deleteAddress(id),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['addresses']})
		},
	})
}

export default useDeleteAddress
