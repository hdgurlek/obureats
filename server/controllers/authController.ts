import {CREATED, OK, UNAUTHORIZED} from '../constants/http'
import Session from '../models/Session'
import {
	createAccount,
	CreateAccountParams,
	LoginParams,
	loginUser,
	refreshUserAccessToken,
} from '../services/AuthService'
import appAssert from '../utils/appAssert'
import catchErrors from '../utils/catchErrors'
import {
	clearAuthCookies,
	getAccessTokenCookieOptions,
	getRefreshTokenCookieOptions,
	setAuthCookies,
} from '../utils/cookies'
import {verifyToken} from '../utils/jwt'
import {loginSchema, registerSchema} from './authSchemas'

export const registerHandler = catchErrors(async (req, res) => {
	const request = registerSchema.parse({
		...req.body,
		userAgent: req.headers['user-agent'],
	}) as CreateAccountParams

	const {user, accessToken, refreshToken} = await createAccount(request)

	return setAuthCookies({res, accessToken, refreshToken}).status(CREATED).json(user)
})

export const loginHandler = catchErrors(async (req, res) => {
	const request = loginSchema.parse({
		...req.body,
		userAgent: req.headers['user-agent'],
	}) as LoginParams

	const {accessToken, refreshToken} = await loginUser(request)
	return setAuthCookies({res, accessToken, refreshToken}).status(OK).json({
		message: 'Login successful',
	})
})

export const logoutHandler = catchErrors(async (req, res) => {
	const accessToken = req.cookies.accessToken as string
	const {payload} = verifyToken(accessToken)
	if (payload) {
		await Session.findByIdAndDelete(payload.sessionId)
	}

	return clearAuthCookies(res).status(OK).json({message: 'Logout successful'})
})

export const refreshHandler = catchErrors(async (req, res) => {
	const refreshToken = req.cookies.refreshToken as string | undefined
	appAssert(refreshToken, UNAUTHORIZED, 'Missing refresh token')

	const {accessToken, newRefreshToken} = await refreshUserAccessToken(refreshToken)

	if (newRefreshToken) {
		res.cookie('refreshToken', newRefreshToken, getRefreshTokenCookieOptions())
	}

	res
		.status(OK)
		.cookie('accessToken', accessToken, getAccessTokenCookieOptions())
		.json({message: 'Access token refreshed'})
})
