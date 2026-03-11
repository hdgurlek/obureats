import mongoose, {Schema, Types, model} from 'mongoose'

export interface FavoriteRestaurantModel extends mongoose.Document {
	userId: Types.ObjectId
	restaurantSlug: string
	createdAt: Date
	updatedAt: Date
}

const favoriteRestaurantSchema = new Schema<FavoriteRestaurantModel>(
	{
		userId: {type: Schema.Types.ObjectId, ref: 'User', required: true, index: true},
		restaurantSlug: {type: String, required: true, index: true},
	},
	{timestamps: true}
)

// One favorite per user per restaurant.
favoriteRestaurantSchema.index({userId: 1, restaurantSlug: 1}, {unique: true})

export default model<FavoriteRestaurantModel>('FavoriteRestaurant', favoriteRestaurantSchema, 'favorite_restaurants')
