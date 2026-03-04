import mongoose, {Schema, Types, model} from 'mongoose'

export interface OrderItem {
	itemUuid: string
	name: string
	quantity: number
	price: number
}

export interface OrderModel extends mongoose.Document {
	restaurantSlug: string
	userId: Types.ObjectId
	cartId: Types.ObjectId
	paymentIntentId: string
	status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELED' | 'PROCESSING' | 'REFUNDED'
	items: OrderItem[]
	totalPrice: number
	createdAt: Date
}

const orderItemSchema = new Schema<OrderItem>(
	{
		itemUuid: {type: String, required: true},
		name: {type: String, required: true},
		quantity: {type: Number, required: true, min: 1},
		price: {type: Number, required: true, min: 0},
	},
	{_id: false}
)

const orderSchema = new Schema<OrderModel>(
	{
		restaurantSlug: {type: String, required: true},
		userId: {type: Schema.Types.ObjectId, ref: 'User', index: true, required: true},
		paymentIntentId: {type: String, required: true},
		status: {
			type: String,
			enum: ['PENDING', 'PAID', 'FAILED', 'CANCELED', 'PROCESSING', 'REFUNDED'],
			default: 'PENDING',
		},
		items: {type: [orderItemSchema], required: true},
		totalPrice: {type: Number, required: true, min: 0},
	},
	{timestamps: true}
)

orderSchema.index({userId: 1, status: 1}, {unique: true, partialFilterExpression: {status: 'PENDING'}})

export default model<OrderModel>('Order', orderSchema, 'orders')
