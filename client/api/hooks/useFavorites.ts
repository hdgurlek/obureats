import {useQuery} from '@tanstack/react-query'
import {getFavorites} from '../api'

const useFavorites = (enabled = true) => {
	return useQuery({
		queryKey: ['favorites'],
		queryFn: getFavorites,
		enabled,
	})
}

export default useFavorites

