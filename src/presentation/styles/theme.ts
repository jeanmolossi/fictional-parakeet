import { createTheme } from '@mui/material'
import { deepPurple } from '@mui/material/colors'

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#000011',
			paper: '#121213'
		},
		primary: deepPurple
	}
})
