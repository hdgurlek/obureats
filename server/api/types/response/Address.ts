export type AddressLabel = 'Home' | 'Work' | 'Other'

export type AddressPayload = {
	id: string
	label: AddressLabel
	fullAddress: string
	city: string
	postalCode: string
	lat?: number
	lng?: number
	isDefault: boolean
	createdAt: Date
	updatedAt: Date
}

export type AddressSnapshot = {
	label: AddressLabel
	fullAddress: string
	city: string
	postalCode: string
}
