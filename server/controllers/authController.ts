import {CREATED, OK} from '../constants/http'
import Session from '../models/Session'
import {createAccount, CreateAccountParams, LoginParams, loginUser} from '../services/AuthService'
import catchErrors from '../utils/catchErrors'
import {clearAuthCookies, setAuthCookies} from '../utils/cookies'
import {verifyToken} from '../utils/jwt'
import {loginSchema, registerSchema} from './authSchemas'

export const registerHandler = catchErrors(async (req, res) => {
	const parsedRequest = registerSchema.parse({
		...req.body,
		userAgent: req.headers['user-agent'],
	})

	// Type assertion to ensure correct typing
	const request: CreateAccountParams = {
		email: parsedRequest.email,
		password: parsedRequest.password,
		userAgent: parsedRequest.userAgent,
	}

	const {user, accessToken, refreshToken} = await createAccount(request)

	return setAuthCookies({res, accessToken, refreshToken}).status(CREATED).json(user)
})

export const loginHandler = catchErrors(async (req, res) => {
	const parsedRequest = loginSchema.parse({
		...req.body,
		userAgent: req.headers['user-agent'],
	})

	const request: LoginParams = {
		email: parsedRequest.email,
		password: parsedRequest.password,
		userAgent: parsedRequest.userAgent,
	}

	const {accessToken, refreshToken} = await loginUser(request)
	return setAuthCookies({res, accessToken, refreshToken}).status(OK).json({
		message: 'Login successful',
	})
})

export const logoutHandler = catchErrors(async (req, res) => {
	const accessToken = req.cookies.accessToken
	const {payload} = verifyToken(accessToken)
	if (payload) {
		await Session.findByIdAndDelete(payload.sessionId)
	}

	return clearAuthCookies(res).status(OK).json({message: 'Logout successful'})
})
