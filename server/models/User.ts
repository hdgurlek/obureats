import mongoose, {Schema, model} from 'mongoose'
import {compareValue, hashValue} from '../utils/bcrypt'

export interface UserModel extends mongoose.Document {
	email: string
	password: string
	verified: boolean
	createdAt: Date
	updatedAt: Date
	comparePassword(val: string): Promise<boolean>
	omitPassword(): Pick<UserModel, '_id' | 'email' | 'verified' | 'createdAt' | 'updatedAt' | '__v'>
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

userSchema.methods.omitPassword = function (val: string) {
	const user = this.toObject()
	delete user.password
	return user
}

export default model<UserModel>('User', userSchema, 'users')
