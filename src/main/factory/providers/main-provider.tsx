import React from 'react'
import { AuthProvider } from '@/presentation/providers'

// MainProvider are wrapping all the application's providers
export function MainProvider ({ children }: { children: React.ReactNode}) {
	return (
		<>
			{children}
		</>
	)
}

// WithRouterProvider are wrapping all the application's providers but its
// runs inside the router. Enabling use Router context. Example useNavigate()
export function WithRouterProvider ({ children }: { children: React.ReactNode}) {
	return (
		<AuthProvider>
			{children}
		</AuthProvider>
	)
}
