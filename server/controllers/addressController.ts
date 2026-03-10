import mongoose from 'mongoose'
import {BAD_REQUEST, CREATED, NOT_FOUND, OK} from '../constants/http'
import UserAddress from '../models/UserAddress'
import appAssert from '../utils/appAssert'
import catchErrors from '../utils/catchErrors'
import {addressIdParamSchema, createAddressSchema, updateAddressSchema} from './addressSchemas'

const toAddressResponse = (address: any) => ({
	id: String(address._id),
	label: address.label,
	fullAddress: address.fullAddress,
	city: address.city,
	postalCode: address.postalCode,
	lat: address.lat,
	lng: address.lng,
	isDefault: address.isDefault,
	createdAt: address.createdAt,
	updatedAt: address.updatedAt,
})

export const getAddressesHandler = catchErrors(async (req, res) => {
	const addresses = await UserAddress.find({userId: req.userId}).sort({isDefault: -1, createdAt: -1}).lean()
	return res.status(OK).json({addresses: addresses.map(toAddressResponse)})
})

export const createAddressHandler = catchErrors(async (req, res) => {
	const request = createAddressSchema.parse(req.body)
	const hasAddress = await UserAddress.exists({userId: req.userId})
	const shouldBeDefault = !hasAddress

	const address = await UserAddress.create({
		userId: req.userId,
		...request,
		isDefault: shouldBeDefault,
	})

	return res.status(CREATED).json({address: toAddressResponse(address)})
})

export const updateAddressHandler = catchErrors(async (req, res) => {
	const {id} = addressIdParamSchema.parse(req.params)
	const request = updateAddressSchema.parse(req.body)

	const address = await UserAddress.findOne({_id: id, userId: req.userId})
	appAssert(address, NOT_FOUND, 'Address not found')

	if (request.isDefault === false && address.isDefault) {
		return res.status(BAD_REQUEST).json({error: 'Default address cannot be unset directly. Set another address as default.'})
	}

	const wantsDefault = request.isDefault === true
	if (wantsDefault) {
		await UserAddress.updateMany({userId: req.userId, _id: {$ne: id}}, {$set: {isDefault: false}})
	}

	Object.assign(address, request)
	await address.save()

	return res.status(OK).json({address: toAddressResponse(address)})
})

export const deleteAddressHandler = catchErrors(async (req, res) => {
	const {id} = addressIdParamSchema.parse(req.params)

	const address = await UserAddress.findOne({_id: id, userId: req.userId})
	appAssert(address, NOT_FOUND, 'Address not found')

	const wasDefault = address.isDefault
	await UserAddress.deleteOne({_id: id, userId: req.userId})

	if (wasDefault) {
		const newestAddress = await UserAddress.findOne({userId: req.userId}).sort({createdAt: -1})
		if (newestAddress) {
			newestAddress.isDefault = true
			await newestAddress.save()
		}
	}

	return res.sendStatus(OK)
})

export const setDefaultAddressHandler = catchErrors(async (req, res) => {
	const {id} = addressIdParamSchema.parse(req.params)

	const address = await UserAddress.findOne({_id: id, userId: req.userId})
	appAssert(address, NOT_FOUND, 'Address not found')

	const session = await mongoose.startSession()
	try {
		await session.withTransaction(async () => {
			await UserAddress.updateMany({userId: req.userId}, {$set: {isDefault: false}}, {session})
			await UserAddress.updateOne({_id: id, userId: req.userId}, {$set: {isDefault: true}}, {session})
		})
	} finally {
		await session.endSession()
	}

	const updated = await UserAddress.findOne({_id: id, userId: req.userId})
	appAssert(updated, BAD_REQUEST, 'Failed to update default address')

	return res.status(OK).json({address: toAddressResponse(updated)})
})
