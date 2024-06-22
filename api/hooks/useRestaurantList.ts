import {useQuery} from '@tanstack/react-query'
import {getRestaurants} from '../mockApi'

const useRestaurantList = () => {
	return useQuery({queryKey: ['restaurantList'], queryFn: () => getRestaurants()})
}

export default useRestaurantList
