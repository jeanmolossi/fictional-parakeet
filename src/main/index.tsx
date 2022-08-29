import React from 'react'
import { Reset } from '@/presentation/styles/reset'
import { MainProvider } from './factory/providers/main-provider'
import { Router } from './router'

export default function App () {
	return (
		<Reset>
			<MainProvider>
				<Router />
			</MainProvider>
		</Reset>
	)
}
