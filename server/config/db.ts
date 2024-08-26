import {MONGO_URI} from '../constants/env'
import mongoose from 'mongoose'

const connectToDatabase = async () => {
	try {
		await mongoose.connect(MONGO_URI)
		console.log('Successfully connected to DB')
	} catch (error) {
		console.log('Could not connect to DB', error)
		process.exit(1)
	}
}

export default connectToDatabase
