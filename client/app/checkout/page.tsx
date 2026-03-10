'use client'

import useAddresses from '@/api/hooks/useAddresses'
import useCreateAddress from '@/api/hooks/useCreateAddress'
import useDeleteAddress from '@/api/hooks/useDeleteAddress'
import usePaymentIntent from '@/api/hooks/useCheckout'
import useSetDefaultAddress from '@/api/hooks/useSetDefaultAddress'
import useUpdateAddress from '@/api/hooks/useUpdateAddress'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import {AddressInput, UserAddress} from '@/types/Address'
import {Alert, Box, Button, Card, CardContent, Divider, Stack, TextField, Typography, styled} from '@mui/material'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {useEffect, useState} from 'react'
import {getCart} from '@/api/api'
import {Cart} from '@/types/Cart'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
const emptyAddressForm: AddressInput = {
	label: 'Home',
	fullAddress: '',
	city: '',
	postalCode: '',
}

export default function CheckoutPage() {
	const [clientSecret, setClientSecret] = useState<string | null>(null)
	const [cart, setCart] = useState<Cart | null>(null)
	const [selectedAddressId, setSelectedAddressId] = useState<string>('')
	const [newAddress, setNewAddress] = useState<AddressInput>(emptyAddressForm)
	const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
	const [editAddress, setEditAddress] = useState<AddressInput>(emptyAddressForm)
	const [uiError, setUiError] = useState<string | null>(null)
	const addressesQuery = useAddresses()
	const {mutateAsync: createPaymentIntent, data: paymentIntent, isPending: isPaymentIntentPending} = usePaymentIntent()
	const {mutateAsync: createAddress, isPending: isCreateAddressPending} = useCreateAddress()
	const {mutateAsync: updateAddress, isPending: isUpdateAddressPending} = useUpdateAddress()
	const {mutateAsync: deleteAddress, isPending: isDeleteAddressPending} = useDeleteAddress()
	const {mutateAsync: setDefaultAddress, isPending: isSetDefaultPending} = useSetDefaultAddress()

	useEffect(() => {
		const addresses = addressesQuery.data?.addresses ?? []
		if (!addresses.length) {
			if (selectedAddressId) setSelectedAddressId('')
			return
		}

		const stillExists = addresses.some((address) => address.id === selectedAddressId)
		if (stillExists) return

		const defaultAddress = addresses.find((address) => address.isDefault)
		setSelectedAddressId(defaultAddress?.id ?? addresses[0].id)
	}, [addressesQuery.data?.addresses, selectedAddressId])

	useEffect(() => {
		let isMounted = true
		async function fetchCart() {
			try {
				const data = await getCart()
				if (isMounted) setCart(data)
			} catch {
				if (isMounted) setCart(null)
			}
		}
		fetchCart()
		return () => {
			isMounted = false
		}
	}, [])

	useEffect(() => {
		if (!selectedAddressId) {
			setClientSecret(null)
			return
		}

		let isMounted = true
		createPaymentIntent({addressId: selectedAddressId})
			.then((data) => {
				if (isMounted) {
					setClientSecret(data.clientSecret)
				}
			})
			.catch(() => {
				if (isMounted) {
					setClientSecret(null)
				}
			})

		return () => {
			isMounted = false
		}
	}, [createPaymentIntent, selectedAddressId])

	const options = {
		layout: {
			type: 'tabs',
			defaultCollapsed: false,
		},
	}

	const appearance = {
		theme: 'stripe' as const,
		variables: {
			colorPrimary: '#000000',
		},
	}

	const OrderCard = styled(Card)(() => ({
		display: 'flex',
		flexDirection: 'column',
		width: 390,
		height: 'auto',
		padding: '1.5rem',
		borderRadius: '0.5rem',
		boxShadow: 'none',
		backgroundColor: '#fff',
	}))

	const OrderRow = styled(Box)(() => ({
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '0.5rem',
	}))

	const items = cart?.items ?? paymentIntent?.order?.items ?? []
	const total = cart?.totalPrice ?? paymentIntent?.order?.totalPrice
	const addresses = addressesQuery.data?.addresses ?? []
	const selectedAddress = addresses.find((address) => address.id === selectedAddressId)
	const isAddressActionPending = isCreateAddressPending || isUpdateAddressPending || isDeleteAddressPending || isSetDefaultPending

	const handleAddAddress = async () => {
		setUiError(null)
		if (!newAddress.fullAddress.trim() || !newAddress.city.trim() || !newAddress.postalCode.trim()) {
			setUiError('Please fill address, city, and postal code.')
			return
		}
		try {
			const response = await createAddress(newAddress)
			setSelectedAddressId(response.address.id)
			setNewAddress(emptyAddressForm)
		} catch (error) {
			setUiError(error instanceof Error ? error.message : 'Failed to create address.')
		}
	}

	const startEditAddress = (address: UserAddress) => {
		setEditingAddressId(address.id)
		setEditAddress({
			label: address.label,
			fullAddress: address.fullAddress,
			city: address.city,
			postalCode: address.postalCode,
			lat: address.lat,
			lng: address.lng,
		})
	}

	const handleUpdateAddress = async (id: string) => {
		setUiError(null)
		try {
			await updateAddress({id, payload: editAddress})
			setEditingAddressId(null)
		} catch (error) {
			setUiError(error instanceof Error ? error.message : 'Failed to update address.')
		}
	}

	const handleDeleteAddress = async (id: string) => {
		setUiError(null)
		try {
			await deleteAddress(id)
		} catch (error) {
			setUiError(error instanceof Error ? error.message : 'Failed to delete address.')
		}
	}

	const handleSetDefaultAddress = async (id: string) => {
		setUiError(null)
		try {
			await setDefaultAddress(id)
		} catch (error) {
			setUiError(error instanceof Error ? error.message : 'Failed to set default address.')
		}
	}

	return (
		<Box
			className="justify-center p-4 md:p-8 direction-column md:direction-row"
			sx={{display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', padding: 4}}
		>
			{/* Address + Stripe Form */}
			<Box sx={{flex: 1, minWidth: '50%', maxWidth: 500}}>
				<Card variant="outlined" sx={{mb: 2}}>
					<CardContent>
						<Typography variant="h6" sx={{fontWeight: 600, mb: 2}}>
							Delivery Address
						</Typography>
						{uiError ? (
							<Alert severity="error" sx={{mb: 2}}>
								{uiError}
							</Alert>
						) : null}
						{addressesQuery.isLoading ? (
							<Typography color="text.secondary">Loading addresses...</Typography>
						) : (
							<Stack spacing={1.5}>
								{addresses.map((address) => (
									<Card
										key={address.id}
										variant="outlined"
										sx={{
											borderColor: selectedAddressId === address.id ? '#000' : 'divider',
										}}
									>
										<CardContent sx={{p: 1.5, '&:last-child': {pb: 1.5}}}>
											<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 1}}>
												<Typography variant="subtitle2">
													{address.label} {address.isDefault ? '(Default)' : ''}
												</Typography>
												<Button
													variant={selectedAddressId === address.id ? 'contained' : 'outlined'}
													size="small"
													onClick={() => setSelectedAddressId(address.id)}
													sx={{textTransform: 'none'}}
												>
													Use
												</Button>
											</Stack>

											{editingAddressId === address.id ? (
												<Stack spacing={1}>
													<TextField
														size="small"
														label="Full address"
														value={editAddress.fullAddress}
														onChange={(e) => setEditAddress((prev) => ({...prev, fullAddress: e.target.value}))}
													/>
													<TextField
														size="small"
														label="City"
														value={editAddress.city}
														onChange={(e) => setEditAddress((prev) => ({...prev, city: e.target.value}))}
													/>
													<TextField
														size="small"
														label="Postal code"
														value={editAddress.postalCode}
														onChange={(e) => setEditAddress((prev) => ({...prev, postalCode: e.target.value}))}
													/>
													<Stack direction="row" spacing={1}>
														<Button
															size="small"
															variant="contained"
															onClick={() => handleUpdateAddress(address.id)}
															disabled={isAddressActionPending}
															sx={{textTransform: 'none'}}
														>
															Save
														</Button>
														<Button
															size="small"
															variant="text"
															onClick={() => setEditingAddressId(null)}
															sx={{textTransform: 'none'}}
														>
															Cancel
														</Button>
													</Stack>
												</Stack>
											) : (
												<>
													<Typography variant="body2" color="text.secondary">
														{address.fullAddress}, {address.city} {address.postalCode}
													</Typography>
													<Stack direction="row" spacing={1} sx={{mt: 1}}>
														<Button size="small" onClick={() => startEditAddress(address)} sx={{textTransform: 'none'}}>
															Edit
														</Button>
														<Button
															size="small"
															onClick={() => handleDeleteAddress(address.id)}
															disabled={isAddressActionPending}
															sx={{textTransform: 'none'}}
														>
															Delete
														</Button>
														{!address.isDefault ? (
															<Button
																size="small"
																onClick={() => handleSetDefaultAddress(address.id)}
																disabled={isAddressActionPending}
																sx={{textTransform: 'none'}}
															>
																Set default
															</Button>
														) : null}
													</Stack>
												</>
											)}
										</CardContent>
									</Card>
								))}

								<Card variant="outlined">
									<CardContent sx={{p: 1.5, '&:last-child': {pb: 1.5}}}>
										<Typography variant="subtitle2" sx={{mb: 1}}>
											Add address
										</Typography>
										<Stack spacing={1}>
											<TextField
												size="small"
												label="Full address"
												value={newAddress.fullAddress}
												onChange={(e) => setNewAddress((prev) => ({...prev, fullAddress: e.target.value}))}
											/>
											<TextField
												size="small"
												label="City"
												value={newAddress.city}
												onChange={(e) => setNewAddress((prev) => ({...prev, city: e.target.value}))}
											/>
											<TextField
												size="small"
												label="Postal code"
												value={newAddress.postalCode}
												onChange={(e) => setNewAddress((prev) => ({...prev, postalCode: e.target.value}))}
											/>
											<Button
												variant="outlined"
												onClick={handleAddAddress}
												disabled={isAddressActionPending}
												sx={{textTransform: 'none'}}
											>
												Save address
											</Button>
										</Stack>
									</CardContent>
								</Card>
							</Stack>
						)}
					</CardContent>
				</Card>

				{selectedAddressId && clientSecret ? (
					<Elements stripe={stripePromise} options={{clientSecret, appearance, ...options}}>
						<CheckoutForm />
					</Elements>
				) : (
					<Alert severity="info">
						{addresses.length === 0
							? 'Add a delivery address to continue with payment.'
							: isPaymentIntentPending
								? 'Preparing payment...'
								: 'Select a delivery address to continue with payment.'}
					</Alert>
				)}
			</Box>

			{/* Order Summary */}
			<Box sx={{flex: 1, minWidth: 300, maxWidth: 400}}>
				<OrderCard>
					<Typography variant="h6" sx={{fontWeight: 600, mb: 2}}>
						Order Summary
					</Typography>

					<Divider sx={{my: 2}} />

					{/* Item list */}
					{items.map((item: any) => (
						<OrderRow key={item.itemUuid}>
							<Typography variant="body1" sx={{flex: 1}}>
								{item.name} × {item.quantity}
							</Typography>
							<Typography variant="body1">€{(item.price * item.quantity).toFixed(2)}</Typography>
						</OrderRow>
					))}

					<Divider sx={{my: 2}} />

					{/* Summary details */}
					<OrderRow>
						<Typography variant="body2" color="text.secondary">
							Subtotal
						</Typography>
						<Typography variant="body2">
							€{items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0).toFixed(2)}
						</Typography>
					</OrderRow>

					<OrderRow>
						<Typography variant="body2" color="text.secondary">
							Delivery
						</Typography>
						<Typography variant="body2">€3.00</Typography>
					</OrderRow>

					<OrderRow>
						<Typography variant="body2" color="text.secondary">
							Tax
						</Typography>
						<Typography variant="body2">€2.50</Typography>
					</OrderRow>

					<Divider sx={{my: 2}} />

					{/* Total */}
					<OrderRow>
						<Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
							Total
						</Typography>
						<Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
							€{(total ?? 0).toFixed(2)}
						</Typography>
					</OrderRow>

					{/* Extra info */}
					<Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
						Order ID: {paymentIntent?.order?.id}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Items: {paymentIntent?.order?.items?.length ?? 0}
					</Typography>
					{selectedAddress ? (
						<Typography variant="body2" color="text.secondary">
							Address: {selectedAddress.fullAddress}, {selectedAddress.city} {selectedAddress.postalCode}
						</Typography>
					) : null}
				</OrderCard>
			</Box>
		</Box>
	)
}
