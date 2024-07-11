import {useQuery} from '@tanstack/react-query'
import {getMenuItem} from '../mockApi'

const useMenuItem = (restaurantSlug: string, itemId: string) => {
	return useQuery({queryKey: ['menuItem', restaurantSlug, itemId], queryFn: () => getMenuItem(restaurantSlug, itemId)})
}

export default useMenuItem
