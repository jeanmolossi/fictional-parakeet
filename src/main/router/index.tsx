import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { RequireAuth } from '@/presentation/providers'
import { WithRouterProvider } from '../factory/providers/main-provider'

const MakeLoginFactory = React.lazy(() => import('../factory/pages/login'))
const MakeRecoverPasswordFactory = React.lazy(() => import('../factory/pages/recover-password'))
const MakeResetPasswordFactory = React.lazy(() => import('../factory/pages/reset-password'))

export function Router () {
	return (
		<BrowserRouter>
			<WithRouterProvider>
				<Suspense fallback={<CircularProgress size={32} />}>
					<Routes>
						<Route
							index
							element={
								<MakeLoginFactory />
							}
						/>

						<Route
							path='/recuperar-senha'
							element={
								<MakeRecoverPasswordFactory />
							}
						/>

						<Route
							path='/resetar-senha/:token'
							element={
								<MakeResetPasswordFactory />
							}
						/>

						<Route
							path="/browse"
							element={
								<RequireAuth>
									<h1>Dashboard</h1>
								</RequireAuth>
							}
						/>

						<Route
							path="*"
							element={
								<Navigate to={'/'} />
							}
						/>
					</Routes>
				</Suspense>
			</WithRouterProvider>
		</BrowserRouter>
	)
}
