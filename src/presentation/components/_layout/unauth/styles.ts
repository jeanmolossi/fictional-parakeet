import Box, { BoxProps } from '@mui/material/Box'
import Container, { ContainerProps } from '@mui/material/Container'
import { styled } from '@mui/material/styles'

export const Layout = styled(Container)<ContainerProps>(() => ({
	minHeight: '100vh',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	overflow: 'hidden'
}))

export const MainBox = styled(Box)<BoxProps>(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	maxWidth: theme.breakpoints.values.sm
}))

export const InnerBox = styled(Box)<BoxProps>(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: theme.palette.background.paper,
	alignItems: 'strech',
	justifyContent: 'strech',
	flex: 1,
	borderRadius: 32,
	paddingTop: theme.spacing(5),
	paddingBottom: theme.spacing(5),
	border: `1px solid ${theme.palette.grey[900]}`
}))
