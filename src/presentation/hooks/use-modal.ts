import { MouseEvent, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface useModalOptions {
	to: string
}

export function useModal ({ to }: useModalOptions) {
	const navigate = useNavigate()
	const location = useLocation() as { state?: { from?: string; modalOpen?: boolean } }

	const onClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		navigate(to, { state: { modalOpen: true } })
	}, [to])

	const onClose = useCallback(() => {
		navigate(location.state?.from || '/browse', { state: { modalOpen: false } })
	}, [location.state?.from])

	return { onClick, onClose }
}
