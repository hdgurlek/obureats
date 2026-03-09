import {useQuery} from '@tanstack/react-query'
import {getOrderHistory} from '../api'

const useOrderHistory = (enabled = true) => {
	return useQuery({
		queryKey: ['orders-history'],
		queryFn: getOrderHistory,
		enabled,
	})
}

export default useOrderHistory
