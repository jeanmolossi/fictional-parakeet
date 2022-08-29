import React, { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FiMail, FiRefreshCw } from 'react-icons/fi'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import * as yup from 'yup'
import { UnauthLayout } from '@/presentation/components'
import { Heading, RecoverLink } from './styles'

type Inputs = {
	email: string
}

export function RecoverPassword () {
	const theme = useTheme()
	const { handleSubmit, control, formState: { errors, dirtyFields, isSubmitting } } = useForm<Inputs>({
		resolver: yupResolver(recoverPasswordValidatorSchema)
	})

	const enabled = useMemo(() => {
		return !!dirtyFields.email
	}, [dirtyFields.email])

	const onSubmit = async (data: Inputs) => {
		await new Promise(resolve => setTimeout(resolve, 5000))
	}

	return (
		<UnauthLayout>
			<Heading variant="h4" gutterBottom textAlign={'center'}>
				Recuperar senha
			</Heading>

			<Grid
				container
				paddingX={{ xs: 6, sm: 12 }}
				maxWidth={theme.breakpoints.values.sm}
				width="100%"
				marginX="auto"
				spacing={theme.spacing(3)}
				component={'form'}
				onSubmit={handleSubmit(onSubmit)}
				alignItems={'stretch'}
				justifyContent={'center'}
				flexDirection={'column'}
				sx={{ transitionProperty: 'padding', transitionDuration: '200ms' }}
			>
				<Grid item xs={12} paddingX={'0 !important'}>
					<Controller
						name='email'
						control={control}
						rules={{ required: true }}
						defaultValue=''
						render={({ field }) => <TextField
							fullWidth
							placeholder='john@doe.com'
							label='E-mail'
							error={!!errors.email}
							helperText={errors.email?.message}
							InputProps={{
								...field,
								startAdornment: (
									<InputAdornment position="start">
										<FiMail />
									</InputAdornment>
								)
							}}
						/>}
					/>

				</Grid>

				<Grid item xs={12} paddingX={'0 !important'}>
					<Button
						fullWidth
						size='large'
						variant='contained'
						color="primary"
						disabled={!enabled || isSubmitting}
						type='submit'
						startIcon={isSubmitting ? <CircularProgress size={20} /> : <FiRefreshCw />}
					>
						{isSubmitting ? 'Recuperando' : 'Recuperar' }
					</Button>
				</Grid>

				<Grid item xs={12} paddingX={'0 !important'}>
					<RecoverLink to={'/'}>
						Acessar conta
					</RecoverLink>
				</Grid>
			</Grid>
		</UnauthLayout>
	)
}

const recoverPasswordValidatorSchema = yup.object({
	email: yup
		.string()
		.email('Insira um e-mail válido')
		.required('O e-mail é obrigatório')
})
