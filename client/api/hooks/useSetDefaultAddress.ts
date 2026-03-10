import {useMutation, useQueryClient} from '@tanstack/react-query'
import {setDefaultAddress} from '../api'

const useSetDefaultAddress = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (id: string) => setDefaultAddress(id),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['addresses']})
		},
	})
}

export default useSetDefaultAddress
