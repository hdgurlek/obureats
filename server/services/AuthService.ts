import {CONFLICT, UNAUTHORIZED} from '../constants/http'
import VerificationCodeType from '../constants/verificationCodeTypes'
import Session from '../models/Session'
import User from '../models/User'
import VerificationCode from '../models/VerificationCode'
import appAssert from '../utils/appAssert'
import {oneYearFromNow} from '../utils/date'
import {refreshTokenSignOptions, signToken} from '../utils/jwt'

export type CreateAccountParams = {email: string; password: string; userAgent?: string}

export async function createAccount(data: CreateAccountParams) {
	//verify existing user doesnt exist
	const existingUser = await User.exists({email: data.email})

	appAssert(!existingUser, CONFLICT, 'Email already in use')

	//create user
	const user = await User.create({email: data.email, password: data.password})
	const userId = user._id

	//create verification code
	const verificationCode = await VerificationCode.create({
		userId,
		type: VerificationCodeType.EmailVerification,
		expiresAt: oneYearFromNow(),
	})

	//send verification email
	//TODO

	//create session
	const session = await Session.create({
		userId,
		userAgent: data.userAgent,
	})

	//create access token and refresh tokens

	const accessToken = signToken({userId, sessionId: session._id})

	const refreshToken = signToken({sessionId: session._id}, refreshTokenSignOptions)

	//return user & tokens

	return {
		user: user.omitPassword(),
		accessToken,
		refreshToken,
	}
}

export type LoginParams = {
	email: string
	password: string
	userAgent?: string
}

export const loginUser = async ({email, password, userAgent}: LoginParams) => {
	//get the user by email
	const user = await User.findOne({email})
	appAssert(user, UNAUTHORIZED, 'Invalid email or password')

	//validate password from the request
	const isValid = await user.comparePassword(password)
	appAssert(user, UNAUTHORIZED, 'Invalid email or password')
	const userId = user._id

	//create a session
	const session = await Session.create({userId, userAgent})

	const sessionInfo = {
		sessionId: session._id,
	}

	//sign access token & refresh token
	const refreshToken = signToken(sessionInfo, refreshTokenSignOptions)

	const accessToken = signToken({...sessionInfo, userId})

	//return user & token
	return {
		user: user.omitPassword(),
		accessToken,
		refreshToken,
	}
}
