import { useState } from 'react'
import { useDebouce } from './use-debounce'

type UseLazyMountProps = { isMounted: boolean, debouncedMount: () => void }

export function useLazyMount (mountTimeout = 10): UseLazyMountProps {
	const [isMounted, setIsMounted] = useState(false)

	const debouncedMount = useDebouce(() => {
		setIsMounted(true)
		console.log('mounted')
	}, mountTimeout)

	return { isMounted, debouncedMount }
}
