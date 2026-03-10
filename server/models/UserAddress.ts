import mongoose, {Schema, Types, model} from 'mongoose'

export type AddressLabel = 'Home' | 'Work' | 'Other'

export interface UserAddressModel extends mongoose.Document {
	userId: Types.ObjectId
	label: AddressLabel
	fullAddress: string
	city: string
	postalCode: string
	lat?: number
	lng?: number
	isDefault: boolean
	createdAt: Date
	updatedAt: Date
}

const userAddressSchema = new Schema<UserAddressModel>(
	{
		userId: {type: Schema.Types.ObjectId, ref: 'User', required: true, index: true},
		label: {
			type: String,
			enum: ['Home', 'Work', 'Other'],
			required: true,
			default: 'Home',
		},
		fullAddress: {type: String, required: true, trim: true},
		city: {type: String, required: true, trim: true},
		postalCode: {type: String, required: true, trim: true},
		lat: {type: Number, required: false},
		lng: {type: Number, required: false},
		isDefault: {type: Boolean, default: false, required: true},
	},
	{timestamps: true}
)

// Enforce at most one default address per user.
userAddressSchema.index({userId: 1, isDefault: 1}, {unique: true, partialFilterExpression: {isDefault: true}})

export default model<UserAddressModel>('UserAddress', userAddressSchema, 'user_addresses')
