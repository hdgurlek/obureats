import mongoose, {Schema, model} from 'mongoose'

export interface RestaurantModel extends mongoose.Document {
	name: string
	slug: string
	rating: number
	image: string
	deliveryTime: string
}

const restaurantSchema = new Schema({
	name: String,
	slug: String,
	rating: Number,
	image: String,
	deliveryTime: String,
})

export default model<RestaurantModel>('Restaurant', restaurantSchema, 'restaurants')
