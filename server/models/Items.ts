import mongoose, {Schema, model} from 'mongoose'

export interface ItemModel extends mongoose.Document {
	name: string
	sequence: number
	image: string
	detail: string
	price: number
	rating: number
	uuid: string
	restaurantSlug: string
}

const itemSchema = new Schema({
	name: String,
	sequence: Number,
	image: String,
	detail: String,
	price: Number,
	rating: Number,
	uuid: String,
	restaurantSlug: String,
})

export default model<ItemModel>('Item', itemSchema, 'items')
