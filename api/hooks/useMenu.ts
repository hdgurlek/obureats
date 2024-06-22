import {useQuery} from '@tanstack/react-query'
import {getRestaurantMenu} from '../mockApi'

const useMenu = (restaurantSlug: string) => {
	return useQuery({queryKey: ['menu', restaurantSlug], queryFn: () => getRestaurantMenu(restaurantSlug)})
}

export default useMenu
