import {AddressInput} from '@/types/Address'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createAddress} from '../api'

const useCreateAddress = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (payload: AddressInput) => createAddress(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['addresses']})
		},
	})
}

export default useCreateAddress
