import {useMutation} from '@tanstack/react-query'
import {getPaymentStatus} from '../api'

const usePaymentStatus = () => {
	return useMutation({
		mutationFn: getPaymentStatus,
	})
}

export default usePaymentStatus
