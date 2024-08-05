import {Schema, Types, model} from 'mongoose'

export interface CartItemModel extends Document {
	quantity: number
	cart: Types.ObjectId
	item: Types.ObjectId
}

const cartItemSchema = new Schema({
	quantity: Number,
	cart: {type: Schema.Types.ObjectId, ref: 'Cart'},
	item: {type: Schema.Types.ObjectId, ref: 'Item'},
})

export default model<CartItemModel>('CartItem', cartItemSchema, 'cartItems')
