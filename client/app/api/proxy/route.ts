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
	const res = await fetch(fetchUrl, {
		headers: req.headers,
	})

	return handleResponse(res)
}

export async function POST(req: NextRequest) {
	const url = new URL(req.url)
	const target = url.searchParams.get('url')

	if (!target) {
		return NextResponse.json({error: 'Missing target URL'}, {status: 400})
	}

	const body = await req.json()

	const res = await fetch(target, {
		method: 'POST',
		headers: req.headers,
		body: JSON.stringify(body),
	})

	return handleResponse(res)
}

export async function PUT(req: NextRequest) {
	const url = new URL(req.url)
	const target = url.searchParams.get('url')

	if (!target) {
		return NextResponse.json({error: 'Missing target URL'}, {status: 400})
	}

	const body = await req.json()

	const res = await fetch(target, {
		method: 'PUT',
		headers: req.headers,
		body: JSON.stringify(body),
	})

	return handleResponse(res)
}

async function handleResponse(res: Response) {
	const contentType = res.headers.get('content-type') || ''

	let body: any

	if (contentType.includes('application/json')) {
		body = await res.json()
		return NextResponse.json(body, {status: res.status, headers: res.headers})
	} else {
		body = await res.text() // fallback for plain text
		return new NextResponse(body, {
			status: res.status,
			headers: res.headers,
		})
	}
}
