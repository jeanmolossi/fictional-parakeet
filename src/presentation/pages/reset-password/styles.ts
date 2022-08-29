import { Link, LinkProps } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

export const Heading = styled(Typography)<TypographyProps>(({ theme }) => ({
	paddingBottom: theme.spacing(5),
	marginBottom: theme.spacing(5),
	borderBottom: `2px solid ${theme.palette.primary.main}`,
	width: '100%'
}))

export const RecoverLink = styled(Link)<LinkProps>(({ theme }) => ({
	color: theme.palette.grey[700],
	textDecoration: 'none',
	textAlign: 'center',
	display: 'block',
	'&:hover': {
		color: theme.palette.primary.main,
		textDecoration: 'underline'
	}
}))
