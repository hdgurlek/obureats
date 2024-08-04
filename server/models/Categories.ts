import {Schema, Types, model} from 'mongoose'

export interface CategoryModel extends Document {
	slug: string
	name: string
	sequence: number
	items: Types.ObjectId[]
}

const categorySchema = new Schema({
	slug: String,
	name: String,
	sequence: Number,
	items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
})

export default model<CategoryModel>('Category', categorySchema, 'categories')
