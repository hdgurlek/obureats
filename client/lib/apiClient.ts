export async function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
	const res = await fetch(input, {...init, credentials: 'include'})

	// If unauthorized → try refresh
	if (res.status === 401) {
		const refreshBackendUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`
		const refreshProxyUrl = `/api/proxy?url=${encodeURIComponent(refreshBackendUrl)}`

		const refreshRes = await fetch(refreshProxyUrl, {
			method: 'GET',
			credentials: 'include',
		})

		if (refreshRes.ok) {
			return fetch(input, {...init, credentials: 'include'})
		}
	}

	return res
}
