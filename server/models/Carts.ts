import mongoose, {Schema, Types, model} from 'mongoose'

export interface CartModel extends mongoose.Document {
	restaurantSlug: string
	userId: Types.ObjectId
}

const cartSchema = new Schema({restaurantSlug: String, userId: {type: Schema.Types.ObjectId, ref: 'User', index: true}})

export default model<CartModel>('Cart', cartSchema, 'carts')
