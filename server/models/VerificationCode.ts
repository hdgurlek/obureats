import mongoose, {Schema, model} from 'mongoose'
import VerificationCodeType from '../constants/verificationCodeTypes'

export interface VerificationCodeModel extends mongoose.Document {
	userId: mongoose.Types.ObjectId
	type: VerificationCodeType
	createdAt: Date
	expiresAt: Date
}

const verificationCodeSchema = new Schema(
	{
		userId: {type: Schema.Types.ObjectId, ref: 'User', index: true, required: true},
		type: {type: String, required: true},
		createdAt: {type: Date, required: true, default: Date.now},
		expiresAt: {type: Date, required: true},
	},
	{timestamps: true}
)

export default model<VerificationCodeModel>('VerificationCode', verificationCodeSchema, 'verification_codes')
