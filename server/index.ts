import 'dotenv/config'
import routes from './api/index'
import connectToDatabase from './config/db'
import {APP_ORIGIN, NODE_ENV, PORT} from './constants/env'
import cookieParser from 'cookie-parser'
import errorHandler from './middleware/errorHandler'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const z = require('zod')

require('express-async-errors')

const app = express()

async function main() {
	await connectToDatabase()

	app.use(cors({origin: APP_ORIGIN, credentials: true}))
	app.use(express.json())
	app.use(express.urlencoded({extended: true}))
	app.use(cookieParser())
	app.use(routes())
	app.use(errorHandler)

	app.listen(PORT, () => {
		console.log(`Store-app listening on port ${PORT} in ${NODE_ENV} environment`)
	})
}

main().catch(err => console.log(err))
