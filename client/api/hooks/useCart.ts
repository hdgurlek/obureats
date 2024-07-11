import {useQuery} from '@tanstack/react-query'
import {getCart} from '../mockApi'

const useCart = () => {
	return useQuery({queryKey: ['cart'], queryFn: getCart})
}

export default useCart
