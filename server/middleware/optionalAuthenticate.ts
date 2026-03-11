import {RequestHandler} from 'express'
import {verifyToken} from '../lib/jwt'

// Like `authenticate`, but never blocks the request.
// If a valid access token exists, it populates req.userId/req.sessionId.
const optionalAuthenticate: RequestHandler = (req, _res, next) => {
	const accessToken = req.cookies.accessToken as string | undefined
	if (!accessToken) return next()

	const {payload} = verifyToken(accessToken)
	if (payload) {
		req.userId = payload.userId
		req.sessionId = payload.sessionId
	}

	return next()
}

export default optionalAuthenticate

