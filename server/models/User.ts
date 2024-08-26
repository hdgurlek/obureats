import {Schema, model} from 'mongoose'
import {compareValue, hashValue} from '../utils/bcrypt'

export interface UserModel extends Document {
	email: string
	password: string
	verified: boolean
	createdAt: Date
	updatedAt: Date
	comparePassword(val: string): Promise<boolean>
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

export default model<UserModel>('User', userSchema, 'users')
