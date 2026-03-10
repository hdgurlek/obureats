import {useQuery} from '@tanstack/react-query'
import {getAddresses} from '../api'

const useAddresses = (enabled = true) => {
	return useQuery({
		queryKey: ['addresses'],
		queryFn: getAddresses,
		enabled,
	})
}

export default useAddresses
