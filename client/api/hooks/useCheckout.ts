import {useMutation} from '@tanstack/react-query'
import {checkout} from '../api'

const useCheckout = () => {
	return useMutation({
		mutationFn: checkout,
	})
}

export default useCheckout
