import mongoose, {Schema, model} from 'mongoose'

export interface CartModel extends mongoose.Document {
	restaurantSlug: string
	userId: string // TODO User model will be implemented
}

const cartSchema = new Schema({restaurantSlug: String, userId: String})

export default model<CartModel>('Cart', cartSchema, 'carts')
