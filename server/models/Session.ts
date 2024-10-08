import mongoose, {Schema, Types, model} from 'mongoose'
import {thirtyDaysFromNow} from '../utils/date'

export interface SessionModel extends mongoose.Document {
	userId: mongoose.Types.ObjectId
	userAgent?: string
	createdAt: Date
	expiresAt: Date
}

const sessionSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, ref: 'User', index: true},
	userAgent: String,
	createdAt: {type: Date, required: true, default: Date.now},
	expiresAt: {type: Date, default: thirtyDaysFromNow},
})

export default model<SessionModel>('Session', sessionSchema)
