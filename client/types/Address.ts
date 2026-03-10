export type AddressLabel = 'Home' | 'Work' | 'Other'

export type AddressInput = {
	label: AddressLabel
	fullAddress: string
	city: string
	postalCode: string
	lat?: number
	lng?: number
}

export type UserAddress = AddressInput & {
	id: string
	isDefault: boolean
	createdAt: string
	updatedAt: string
}

export type UpdateAddressInput = Partial<AddressInput> & {
	isDefault?: boolean
}

export type AddressSnapshot = {
	label: AddressLabel
	fullAddress: string
	city: string
	postalCode: string
}

export type CheckoutPayload = {
	addressId: string
}
