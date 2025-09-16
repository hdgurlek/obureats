import {useMutation} from '@tanstack/react-query'
import {login} from '../api'

const useLogin = (email: string, password: string) => {
	return useMutation({
		mutationFn: () => login(email, password),
		mutationKey: ['login'],
	})
}

export default useLogin
