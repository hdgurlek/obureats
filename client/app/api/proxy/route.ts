import {NextRequest, NextResponse} from 'next/server'

export async function GET(req: NextRequest) {
	const url = new URL(req.url)
	const target = url.searchParams.get('url') // API endpoint passed as query param

	if (!target) {
		return NextResponse.json({error: 'Missing target URL'}, {status: 400})
	}

	// Forward original query params except "url"
	const params = new URLSearchParams(url.searchParams)
	params.delete('url')

	const fetchUrl = `${target}?${params.toString()}`
	const response = await fetch(fetchUrl, {
		headers: {
			// forward client headers if needed
			'Content-Type': 'application/json',
			// add secure server-side headers
			// Authorization: `Bearer ${process.env.SECRET_API_KEY}`,
		},
	})

	const data = await response.json()
	return NextResponse.json(data, {status: response.status})
}

export async function POST(req: NextRequest) {
	const url = new URL(req.url)
	const target = url.searchParams.get('url')

	if (!target) {
		return NextResponse.json({error: 'Missing target URL'}, {status: 400})
	}

	const body = await req.json()

	const response = await fetch(target, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			/*  Authorization: `Bearer ${process.env.SECRET_API_KEY}`,*/
		},
		body: JSON.stringify(body),
	})

	const data = await response.json()
	return NextResponse.json(data, {status: response.status})
}
