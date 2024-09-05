import {JWT_REFRESH_SECRET} from '../constants/env'
import {CONFLICT} from '../constants/http'
import VerificationCodeType from '../constants/verificationCodeTypes'
import Session from '../models/Session'
import User from '../models/User'
import VerificationCode from '../models/VerificationCode'
import appAssert from '../utils/appAssert'
import {oneYearFromNow} from '../utils/date'
import jwt from 'jsonwebtoken'

export type CreateAccountParams = {email: string; password: string; userAgent?: string}

export async function createAccount(data: CreateAccountParams) {
	//verify existing user doesnt exist
	const existingUser = await User.exists({email: data.email})

	appAssert(!existingUser, CONFLICT, 'Email already in use')

	//create user
	const user = await User.create({email: data.email, password: data.password})

	//create verification code
	const verificationCode = await VerificationCode.create({
		userId: user._id,
		type: VerificationCodeType.EmailVerification,
		expiresAt: oneYearFromNow(),
	})

	//send verification email
	//TODO

	//create session
	const session = await Session.create({
		userId: user._id,
		userAgent: data.userAgent,
	})

	//create access token and refresh tokens

	const refreshToken = jwt.sign({sessionId: session._id}, JWT_REFRESH_SECRET, {
		audience: ['user'],
		expiresIn: '30d',
	})

	const accessToken = jwt.sign({userId: user._id, sessionId: session._id}, JWT_REFRESH_SECRET, {
		audience: ['user'],
		expiresIn: '15m',
	})

	//return user & tokens

	return {
		user: user.omitPassword(),
		accessToken,
		refreshToken,
	}
}
