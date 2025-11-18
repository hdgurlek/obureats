import {styled} from '@mui/material/styles'

const Spinner = styled('div')(() => ({
	borderRadius: '50%',
	color: '#ffffff',
	fontSize: '22px',
	textIndent: '-99999px',
	margin: '0 auto',
	position: 'relative',
	width: '20px',
	height: '20px',
	boxShadow: 'inset 0 0 0 2px',
	transform: 'translateZ(0)',
	'&::before, &::after': {
		position: 'absolute',
		content: '""',
	},
	'&::before': {
		width: '10.4px',
		height: '20.4px',
		background: '#0055DE',
		borderRadius: '20.4px 0 0 20.4px',
		top: '-0.2px',
		left: '-0.2px',
		transformOrigin: '10.4px 10.2px',
		animation: 'loading 2s infinite ease 1.5s',
	},
	'&::after': {
		width: '10.4px',
		height: '10.2px',
		background: '#0055DE',
		borderRadius: '0 10.2px 10.2px 0',
		top: '-0.1px',
		left: '10.2px',
		transformOrigin: '0px 10.2px',
		animation: 'loading 2s infinite ease',
	},
	'@keyframes loading': {
		'0%': {transform: 'rotate(0deg)'},
		'100%': {transform: 'rotate(360deg)'},
	},
}))

export default Spinner
