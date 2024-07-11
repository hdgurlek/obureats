import {Schema, model} from 'mongoose'

const categorySchema = new Schema({
	slug: String,
	name: String,
	sequence: Number,
	items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
})

export default model('Category', categorySchema, 'categories')
