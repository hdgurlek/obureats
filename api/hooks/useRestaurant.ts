import {useQuery} from '@tanstack/react-query'
import {getRestaurant} from '../mockApi'

const useRestaurant = (slug: string) => {
	return useQuery({queryKey: ['restaurant', slug], queryFn: () => getRestaurant(slug)})
}

export default useRestaurant
