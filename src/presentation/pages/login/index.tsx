import React, { useCallback, useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FiEye, FiEyeOff, FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment'
import { useTheme } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import * as yup from 'yup'
import { UnauthLayout } from '@/presentation/components'
import { useAuth } from '@/presentation/providers'
import { Heading, RecoverLink } from './styles'

type Inputs = {
	email: string
	password: string
}

export function Login () {
	const theme = useTheme()
	const { signin, remember, setRemember } = useAuth()
	const navigate = useNavigate()
	const location = useLocation() as { state?: { from?: { pathname: string; } } }
	const formHook = useForm<Inputs>({ resolver: loginSchemaValidator })

	const [showPassword, setShowPassword] = useState(false)

	const { handleSubmit, control, formState: { errors, dirtyFields, isSubmitting } } = formHook
	const enabled = useMemo(() => !!dirtyFields.email && !!dirtyFields.password, [dirtyFields.email, dirtyFields.password])

	const togglePassword = useCallback(() => setShowPassword(!showPassword), [showPassword])

	const from = location.state?.from?.pathname || '/'
	const onSubmit = async ({ email, password }: Inputs) => {
		await signin(email, password, () => {
			navigate(from, { replace: true })
		})
	}

	return (
		<UnauthLayout>
			<Heading variant="h4" gutterBottom textAlign={'center'}>
				Acesse sua conta
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
					<Controller
						name='password'
						rules={{ required: true }}
						control={control}
						defaultValue=''
						render={({ field }) => <TextField
							fullWidth
							placeholder='Su9er@secr3t4!'
							label='Senha'
							type={showPassword ? 'text' : 'password'}
							error={!!errors.password}
							helperText={errors.password?.message}
							InputProps={{
								...field,
								startAdornment: (
									<InputAdornment position="start">
										<FiLock />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={togglePassword}
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												width: 40,
												height: 40,
												aspectRatio: 1
											}}
										>
											<>
												{showPassword
													? (
														<Fade in={showPassword} mountOnEnter unmountOnExit>
															<div><FiEyeOff size={18} /></div>
														</Fade>
													)
													: null}

												{!showPassword
													? (
														<Fade in={!showPassword} mountOnEnter unmountOnExit>
															<div><FiEye size={18}/></div>
														</Fade>
													)
													: null}
											</>
										</IconButton>
									</InputAdornment>
								)
							}}
						/>}
					/>
				</Grid>

				<Grid item xs={12} paddingX={'0 !important'}>
					<FormControlLabel
						control={
							<Switch
								value="remember"
								color="primary"
								onChange={(_, checked) => setRemember(checked)}
								inputProps={{ 'aria-label': 'controlled' }}
								checked={remember}
							/>
						}
						label="Manter-me conectado"
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
						startIcon={isSubmitting ? <CircularProgress size={20} /> : <FiLogIn />}
					>
						{isSubmitting ? 'Acessando' : 'Acessar' }
					</Button>
				</Grid>

				<Grid item xs={12} paddingX={'0 !important'}>
					<RecoverLink to={'/recuperar-senha'}>
						Esqueceu sua senha ?
					</RecoverLink>
				</Grid>
			</Grid>
		</UnauthLayout>
	)
}

const loginSchemaValidator = yupResolver(yup.object({
	email: yup
		.string()
		.email('Insira um e-mail válido')
		.required('O e-mail é obrigatório'),
	password: yup
		.string()
		.min(6, 'A senha deve conter pelo menos 6 caracteres')
		.max(64, 'A senha deve conter no máximo 64 caracteres')
		.required('A senha é obrigatória')
}))
