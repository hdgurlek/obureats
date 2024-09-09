import {sign} from 'crypto'
import {CONFLICT, UNAUTHORIZED} from '../constants/http'
import VerificationCodeType from '../constants/verificationCodeTypes'
import Session from '../models/Session'
import User from '../models/User'
import VerificationCode from '../models/VerificationCode'
import appAssert from '../utils/appAssert'
import {ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow} from '../utils/date'
import {RefreshTokenPayload, refreshTokenSignOptions, signToken, verifyToken} from '../utils/jwt'

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

export const refreshUserAccessToken = async (refreshToken: string) => {
	const {payload} = verifyToken<RefreshTokenPayload>(refreshToken, {
		secret: refreshTokenSignOptions.secret,
	})

	appAssert(payload, UNAUTHORIZED, 'Invalid refresh token')

	const session = await Session.findById(payload.sessionId)
	const now = Date.now()
	appAssert(session && session.expiresAt.getTime() > now, UNAUTHORIZED, 'Session expired')

	//refresh the session if it expires in the next 24 hours
	const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS
	if (sessionNeedsRefresh) {
		session.expiresAt = thirtyDaysFromNow()
		await session.save()
	}

	const newRefreshToken = sessionNeedsRefresh
		? signToken(
				{
					sessionId: session._id,
				},
				refreshTokenSignOptions
		  )
		: undefined

	const accessToken = signToken({
		userId: session.userId,
		sessionId: session._id,
	})

	return {accessToken, newRefreshToken}
}
