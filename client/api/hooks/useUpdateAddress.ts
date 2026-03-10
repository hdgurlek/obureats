import {UpdateAddressInput} from '@/types/Address'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {updateAddress} from '../api'

const useUpdateAddress = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({id, payload}: {id: string; payload: UpdateAddressInput}) => updateAddress(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['addresses']})
		},
	})
}

export default useUpdateAddress
