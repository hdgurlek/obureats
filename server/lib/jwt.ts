import jwt, {SignOptions, VerifyOptions} from 'jsonwebtoken'
import {SessionModel} from '../models/Session'
import {UserModel} from '../models/User'
import {JWT_REFRESH_SECRET, JWT_SECRET} from '../constants/env'

export type RefreshTokenPayload = {
	sessionId: SessionModel['_id']
}

export type AccessTokenPayload = {
	userId: UserModel['_id']
	sessionId: SessionModel['_id']
}

type SignOptionsAndSecret = SignOptions & {secret: string}

const signDefaults: SignOptions = {
	audience: 'user',
}

const verifyDefaults: VerifyOptions = {
	audience: 'user',
}

export const accessTokenSignOptions: SignOptionsAndSecret = {
	expiresIn: '15m',
	secret: JWT_SECRET,
}

export const refreshTokenSignOptions: SignOptionsAndSecret = {
	expiresIn: '30d',
	secret: JWT_REFRESH_SECRET,
}

export const signToken = (payload: AccessTokenPayload | RefreshTokenPayload, options?: SignOptionsAndSecret) => {
	const {secret, ...signOpts} = options || accessTokenSignOptions
	return jwt.sign(payload, secret, {...signDefaults, ...signOpts})
}
type VerifyResult<T> =
	| {payload: T; error?: undefined}
	| {payload?: undefined; error: string}

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
	token: string,
	options: VerifyOptions & {secret?: string} = {}
): VerifyResult<TPayload> => {
	const {secret = JWT_SECRET, ...verifyOpts} = options

	try {
		const decoded = jwt.verify(token, secret, {
			...verifyDefaults,
			...verifyOpts,
		})

		if (typeof decoded === 'string') {
			return {error: 'Invalid token payload'}
		}

		return {payload: decoded as unknown as TPayload}
	} catch (error) {
		if (error instanceof Error) {
			return {error: error.message}
		}

		return {error: 'Token verification failed'}
	}
}
