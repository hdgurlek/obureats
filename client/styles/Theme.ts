'use client'
import {createTheme} from '@mui/material/styles'
import {Inter} from 'next/font/google'

const mainFont = Inter({subsets: ['latin'], display: 'swap'})

const theme = createTheme({
	typography: {
		fontSize: 14,
		fontFamily: mainFont.style.fontFamily,
	},
})

export default theme
