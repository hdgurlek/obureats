import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutForm from './CheckoutForm'

const mockUseStripe = jest.fn()
const mockUseElements = jest.fn()

jest.mock('@stripe/react-stripe-js', () => ({
	PaymentElement: () => <div data-testid="payment-element" />,
	useStripe: () => mockUseStripe(),
	useElements: () => mockUseElements(),
}))

beforeEach(() => {
	mockUseStripe.mockReset()
	mockUseElements.mockReset()
})
describe('CheckoutForm', () => {
	test('renders Place Order button and it is disabled when Stripe is not ready', () => {
		mockUseStripe.mockReturnValue(null)

		render(<CheckoutForm />)

		const button = screen.getByRole('button', {name: /place order/i})

		expect(button).toBeInTheDocument()
		expect(button).toBeDisabled()
	})

	test('renders Place Order button and it is enabled when Stripe is ready', () => {
		mockUseStripe.mockReturnValue({})

		render(<CheckoutForm />)

		const button = screen.getByRole('button', {name: /place order/i})

		expect(button).toBeInTheDocument()
		expect(button).toBeEnabled()
	})

	test('renders PaymentElement', () => {
		render(<CheckoutForm />)

		const paymentElement = screen.getByTestId('payment-element')

		expect(paymentElement).toBeInTheDocument()
	})

	test('renders Spinner and disables Place Order button when button is clicked', async () => {
		const user = userEvent.setup()

		const confirmPayment = jest.fn(() => new Promise(() => {}))
		mockUseStripe.mockReturnValue({confirmPayment})

		render(<CheckoutForm />)

		let spinner = screen.queryByTestId('spinner')
		expect(spinner).not.toBeInTheDocument()

		const button = screen.getByRole('button', {name: /place order/i})
		await user.click(button)

		spinner = screen.queryByTestId('spinner')
		expect(spinner).toBeInTheDocument()
		expect(button).toBeDisabled()
	})

	test('does not show error message when stripe payment is successful', async () => {
		const user = userEvent.setup()

		const mockConfirmPayment = jest.fn().mockResolvedValue({error: null})
		mockUseStripe.mockReturnValue({confirmPayment: mockConfirmPayment})
		mockUseElements.mockReturnValue({})

		render(<CheckoutForm />)

		await user.click(screen.getByRole('button', {name: /place order/i}))
		const errorMessage = screen.queryByTestId('error-message')
		expect(mockConfirmPayment).toHaveBeenCalledTimes(1)
		expect(errorMessage).not.toBeInTheDocument()
	})

	test('shows error message when stripe payment is not successful', async () => {
		const user = userEvent.setup()

		const mockConfirmPayment = jest.fn().mockResolvedValue({error: {type: 'card_error', message: 'Card declined'}})
		mockUseStripe.mockReturnValue({confirmPayment: mockConfirmPayment})
		mockUseElements.mockReturnValue({})

		render(<CheckoutForm />)

		await user.click(screen.getByRole('button', {name: /place order/i}))
		const errorMessage = screen.queryByTestId('error-message')
		expect(mockConfirmPayment).toHaveBeenCalledTimes(1)
		expect(errorMessage).toBeInTheDocument()
	})
})
