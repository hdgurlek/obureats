import {useQuery} from '@tanstack/react-query'
import {getUser} from '../api'

const useUser = () => {
	return useQuery({queryKey: ['user'], queryFn: getUser})
}

export default useUser
