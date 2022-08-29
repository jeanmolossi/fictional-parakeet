import React, { useMemo } from 'react'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { Layout, MainBox, InnerBox } from './styles'

interface UnauthLayoutProps {
	children?: React.ReactNode;
}

export const UnauthLayout: React.FC<UnauthLayoutProps> = ({ children }) => {
	const timeoutAnimation = useMemo(() => 600, [])

	return (
		<Layout maxWidth="sm">
			<Fade in timeout={timeoutAnimation}>
				<MainBox>
					<Typography component={'h1'} variant='h2' textAlign={'center'} gutterBottom>
						Plataforma
					</Typography>

					<InnerBox>
						{children}
					</InnerBox>
				</MainBox>
			</Fade>
		</Layout>
	)
}
