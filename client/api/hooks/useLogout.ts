import {useMutation, useQueryClient} from '@tanstack/react-query'
import {logout} from '../api'

const useLogout = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: logout,
		mutationKey: ['logout'],
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['user']})
		},
	})
}

export default useLogout
