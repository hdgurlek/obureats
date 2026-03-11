import {useMutation, useQueryClient} from '@tanstack/react-query'
import {addFavorite, removeFavorite} from '../api'

const useToggleFavorite = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['toggle-favorite'],
		mutationFn: async ({slug, nextFavorite}: {slug: string; nextFavorite: boolean}) => {
			if (nextFavorite) {
				await addFavorite(slug)
			} else {
				await removeFavorite(slug)
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['favorites']})
			queryClient.invalidateQueries({queryKey: ['restaurantList']})
			queryClient.invalidateQueries({queryKey: ['restaurant']})
		},
	})
}

export default useToggleFavorite

