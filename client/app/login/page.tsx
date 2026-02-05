'use client'

import {Box, Typography} from '@mui/material'
import {useEffect, useMemo} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import useUser from '@/api/hooks/useUser'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const user = useUser()

	const redirectTo = useMemo(() => searchParams.get('redirectTo') ?? '/', [searchParams])

	useEffect(() => {
		if (user.data?.email) {
			router.replace(redirectTo)
		}
	}, [user.data?.email, redirectTo, router])

	const handleSuccess = () => {
		router.replace(redirectTo)
	}

	return (
		<Box sx={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4}}>
			<Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
				<Typography variant="h4" sx={{fontWeight: 700}}>
					Welcome back
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Log in to continue your order.
				</Typography>
				<LoginForm redirectTo={redirectTo} onSuccess={handleSuccess} />
			</Box>
		</Box>
	)
}
