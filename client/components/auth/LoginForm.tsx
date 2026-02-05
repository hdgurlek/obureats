'use client'

import {useState} from 'react'
import {Box, Button, TextField, Typography, Paper} from '@mui/material'
import useLogin from '@/api/hooks/useLogin'

interface LoginFormProps {
	redirectTo: string
	onSuccess: () => void
}

export default function LoginForm({redirectTo, onSuccess}: LoginFormProps) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {mutateAsync: login} = useLogin(email, password)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setError(null)
		setIsSubmitting(true)

		try {
			await login()
			onSuccess()
		} catch (err: any) {
			setError(err?.message ?? 'Login failed.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Paper elevation={0} sx={{p: 4, border: '1px solid #eee', borderRadius: 2, maxWidth: 420}}>
			<Typography variant="h5" sx={{fontWeight: 600, mb: 2}}>
				Log In
			</Typography>
			<form onSubmit={handleSubmit}>
				<Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
					<TextField
						label="Email"
						type="email"
						autoComplete="email"
						value={email}
						onChange={event => setEmail(event.target.value)}
						required
					/>
					<TextField
						label="Password"
						type="password"
						autoComplete="current-password"
						value={password}
						onChange={event => setPassword(event.target.value)}
						required
					/>
					{error && (
						<Typography variant="body2" color="error">
							{error}
						</Typography>
					)}
					<Button type="submit" variant="contained" disabled={isSubmitting} sx={{textTransform: 'none'}}>
						{isSubmitting ? 'Logging in…' : 'Log In'}
					</Button>
					<Typography variant="caption" color="text.secondary">
						You will be redirected to {redirectTo}
					</Typography>
				</Box>
			</form>
		</Paper>
	)
}
