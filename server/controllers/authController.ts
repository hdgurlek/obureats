import {CREATED} from '../constants/http'
import {createAccount, CreateAccountParams} from '../services/AuthService'
import catchErrors from '../utils/catchErrors'
import {setAuthCookies} from '../utils/cookies'
import {registerSchema} from './authSchemas'

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
