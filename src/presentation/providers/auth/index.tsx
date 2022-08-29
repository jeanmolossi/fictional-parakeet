import React, { useCallback, useEffect, useMemo } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Authenticator } from '@/data/auth'
import { HttpClient } from '@/data/protocols/http/http-client'
import { Producer } from '@/domain/producer'
import { useSession, useStorage } from '@/presentation/hooks/use-storage'

interface AuthContextType {
	producer: Producer;
	signin: (email: string, password: string, action?: () => void) => Promise<void>;
	signout: () => Promise<void>;
	remember: boolean;
	setRemember: (newValue: boolean | null) => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider ({ children }: { children: React.ReactNode }) {
	const [remember, setRemember] = useStorage<boolean>('remember')

	// if remember me is checked, try to get the producer from local storage
	const storageProvider = remember === true
		? useStorage
		: useSession

	const [producer, setProducer] = storageProvider<Producer>('producer')

	const authenticator = useMemo(() => new Authenticator(
		new HttpClient(process.env.BASE_API!)
	), [])

	const signin = useCallback(async (email: string, password: string, action?: () => void) => {
		try {
			const _student = authenticator.getStudentSync(
				await authenticator.signIn(email, password)
			)

			setProducer(_student)
			action?.()
		} catch (e) {
			console.error(e)
		}
	}, [authenticator, remember, setProducer])

	const signout = useCallback(async () => {
		try {
			await authenticator.signOut()
		} catch (e) {
			console.error(e)
		} finally {
			setProducer(null!)
		}
	}, [authenticator, setProducer])

	const navigate = useNavigate()

	useEffect(() => {
		if (!!producer && ['/', '/recuperar-conta', '/resetar-senha'].includes(location.pathname)) {
			navigate((location as any).state?.from.pathname || '/browse', { replace: true })
		}
	}, [producer, location.pathname])

	useEffect(() => {
		authenticator.checkSession().then(clearSession(signout))
	}, [location.pathname])

	return <AuthContext.Provider value={{
		producer,
		signin,
		signout,
		remember,
		setRemember
	}}>
		{children}
	</AuthContext.Provider>
}

// RequireAuth checks if the user is authenticated and redirects to the login page if not
export function RequireAuth ({ children }: { children: JSX.Element }) {
	const auth = useAuth()
	const location = useLocation()

	if (!auth.producer) {
		return <Navigate to="/" replace state={{ from: location }} />
	}

	return children
}

export function useAuth () {
	return React.useContext(AuthContext)
}

type CheckSession = (isAuth: boolean) => Promise<void>
type SignoutFn = () => Promise<void>

/**
 * clearSession is a function that clears the session if the user is not authenticated
 * @param {SignoutFn} signout a function to sign out the user
 * @returns {CheckSession} a function to check if the user is authenticated
 */
function clearSession (signout: SignoutFn): CheckSession {
	return async (isAuth: boolean) => {
		if (!isAuth) { await signout() }
	}
}
