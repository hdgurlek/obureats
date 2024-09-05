import mongoose, {Schema, model} from 'mongoose'

export interface RestaurantModel extends mongoose.Document {
	name: string
	slug: string
	rating: number
	favorite: boolean
	image: string
	deliveryTime: string
}

const restaurantSchema = new Schema({
	name: String,
	slug: String,
	rating: Number,
	favorite: Boolean,
	image: String,
	deliveryTime: String,
})

export default model<RestaurantModel>('Restaurant', restaurantSchema)
