import React, { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FiEye, FiEyeOff, FiLock, FiMail, FiRefreshCw } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import * as yup from 'yup'
import { UnauthLayout } from '@/presentation/components'
import { Heading, RecoverLink } from './styles'

type Inputs = {
	password: string
	password_confirmation: string
}

export function ResetPassword () {
	const theme = useTheme()
	const { handleSubmit, control, formState: { errors, dirtyFields, isSubmitting } } = useForm<Inputs>({
		resolver: yupResolver(resetPasswordSchema)
	})

	const params = useParams()
	const navigate = useNavigate()

	if (!params.token) {
		navigate('/', { replace: true })
	}

	const enabled = useMemo(() => {
		return !!dirtyFields.password_confirmation && !!dirtyFields.password
	}, [dirtyFields.password, dirtyFields.password_confirmation])

	const [showPassword, setShowPassword] = useState(false)

	const togglePassword = () => setShowPassword(!showPassword)

	const onSubmit = async (data: Inputs) => {
		await new Promise(resolve => setTimeout(resolve, 5000))
	}

	return (
		<UnauthLayout>
			<Heading variant="h4" gutterBottom textAlign={'center'}>
				Nova senha
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
				<Grid item xs={12} paddingX={'0 !important'}
					sx={{ cursor: 'not-allowed' }}
				>
					<TextField
						fullWidth
						placeholder='john@doe.com'
						label='E-mail'
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FiMail />
								</InputAdornment>
							)
						}}
						disabled
						defaultValue={'seu@email'}
						sx={{ pointerEvents: 'none' }}
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
					<Controller
						name='password_confirmation'
						rules={{ required: true }}
						control={control}
						defaultValue=''
						render={({ field }) => <TextField
							fullWidth
							placeholder='Su9er@secr3t4!'
							label='Senha'
							type={showPassword ? 'text' : 'password'}
							error={!!errors.password_confirmation}
							helperText={errors.password_confirmation?.message}
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

const resetPasswordSchema = yup.object({
	password: yup
		.string()
		.required('O e-mail é obrigatório')
		.min(6, 'A senha deve ter no mínimo 6 caracteres')
		.max(64, 'A senha deve ter no máximo 64 caracteres'),
	password_confirmation: yup
		.string()
		.required('A confirmação de senha é obrigatória')
		.oneOf([yup.ref('password'), null], 'As senhas não conferem')
})
