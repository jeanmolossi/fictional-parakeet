import React from 'react'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { darkTheme } from './theme'

export function Reset ({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}
