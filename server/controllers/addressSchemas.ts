import {z} from 'zod'

const addressLabelSchema = z.enum(['Home', 'Work', 'Other'])

export const createAddressSchema = z
	.object({
		label: addressLabelSchema,
		fullAddress: z.string().trim().min(1).max(255),
		city: z.string().trim().min(1).max(120),
		postalCode: z.string().trim().min(1).max(20),
		lat: z.number().min(-90).max(90).optional(),
		lng: z.number().min(-180).max(180).optional(),
	})
	.refine((value) => (value.lat === undefined) === (value.lng === undefined), {
		message: 'lat and lng must be provided together',
		path: ['lat'],
	})

export const updateAddressSchema = z
	.object({
		label: addressLabelSchema.optional(),
		fullAddress: z.string().trim().min(1).max(255).optional(),
		city: z.string().trim().min(1).max(120).optional(),
		postalCode: z.string().trim().min(1).max(20).optional(),
		lat: z.number().min(-90).max(90).optional(),
		lng: z.number().min(-180).max(180).optional(),
		isDefault: z.boolean().optional(),
	})
	.refine((value) => Object.keys(value).length > 0, {
		message: 'At least one field is required for update',
	})
	.refine((value) => (value.lat === undefined) === (value.lng === undefined), {
		message: 'lat and lng must be provided together',
		path: ['lat'],
	})

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid address id')

export const addressIdParamSchema = z.object({
	id: objectIdSchema,
})
