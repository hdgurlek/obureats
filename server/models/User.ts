import {Document, Types, Schema, model} from 'mongoose'
import {compareValue, hashValue} from '../lib/bcrypt'

export type PublicUser = {
	_id: Types.ObjectId
	email: string
	verified: boolean
	createdAt: Date
	updatedAt: Date
}

export interface UserModel extends Document {
	_id: Types.ObjectId
	email: string
	password: string
	verified: boolean
	createdAt: Date
	updatedAt: Date
	comparePassword(val: string): Promise<boolean>
	omitPassword(): PublicUser
}

const userSchema = new Schema(
	{
		email: {type: String, required: true, unique: true},
		password: {type: String, required: true},
		verified: {type: Boolean, required: true, default: false},
	},
	{timestamps: true}
)

userSchema.pre('save', async function (next) {
	this.password = await hashValue(this.password, 8)
	next()
})

userSchema.methods.comparePassword = async function (val: string) {
	return compareValue(val, this.password)
}

userSchema.methods.omitPassword = function () {
	const user = this.toObject()
	delete user.password
	return user as PublicUser
}

export default model<UserModel>('User', userSchema, 'users')
