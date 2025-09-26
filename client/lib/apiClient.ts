const API_URL = `/api/proxy?url=${process.env.NEXT_PUBLIC_API_URL}`

export async function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
	const res = await fetch(input, {...init, credentials: 'include'})

	if (res.status === 401) {
		const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
			method: 'GET',
			credentials: 'include',
		})

		if (refreshRes.ok) {
			return fetch(input, {...init, credentials: 'include'})
		}
	}

	return res
}
