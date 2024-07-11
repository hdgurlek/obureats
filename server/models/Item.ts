import {Schema, model} from 'mongoose'

const itemSchema = new Schema({
	name: String,
	sequence: Number,
	image: String,
	detail: String,
	price: Number,
	rating: Number,
	uuid: String,
})

export default model('Item', itemSchema, 'items')
