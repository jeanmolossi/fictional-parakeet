import { useCallback, useMemo, useState } from 'react'

type UseStorage<T> = [T, (newValue: T | null) => void]

const APP_KEY = '@devflix-courses'

export function useStorage<T> (key: string, initialValue: T | null = null): UseStorage<T> {
	const composedKey = useMemo(() => `${APP_KEY}::${key}`, [key])

	const [state, setState] = useState<T>(() => {
		const storedString = localStorage.getItem(composedKey)

		if (storedString) {
			return JSON.parse(storedString) as T
		}

		return initialValue!
	})

	const setStore = useCallback((newValue: T | null = null) => {
		if (!newValue && typeof newValue !== 'boolean') {
			localStorage.removeItem(composedKey)
			setState(newValue!)
			return
		}

		localStorage.setItem(composedKey, JSON.stringify(newValue))
		setState(newValue)
	}, [composedKey])

	return [state, setStore]
}

type UseSession<T> = [T, (newValue: T | null) => void]

export function useSession<T> (key: string, initialValue: T | null = null): UseSession<T> {
	const composedKey = useMemo(() => `${APP_KEY}::${key}`, [key])

	const [state, setState] = useState<T>(() => {
		const storedString = sessionStorage.getItem(composedKey)

		if (storedString) {
			return JSON.parse(storedString) as T
		}

		return initialValue!
	})

	const setStore = useCallback((newValue: T | null = null) => {
		if (!newValue && typeof newValue !== 'boolean') {
			sessionStorage.removeItem(composedKey)
			setState(newValue!)
			return
		}

		sessionStorage.setItem(composedKey, JSON.stringify(newValue))
		setState(newValue)
	}, [composedKey])

	return [state, setStore]
}
