import { useCallback } from 'react'

/**
 * debounce a function
 * @param func - The function to debounce
 * @param timeout - The timeout in milliseconds
 * @returns The debounced function
 */
function debounce<T> (func: (...args: T[]) => void, timeout = 300) {
	let timer: NodeJS.Timeout

	return (...args: T[]) => {
		// @ts-ignore
		const context = this as typeof debounce
		clearTimeout(timer)

		timer = setTimeout(() => {
			func.apply(context, args)
		}, timeout)
	}
}

export function useDebouce<T> (func: (...args: T[]) => void, timeout = 3000) {
	return useCallback(debounce(func, timeout), [])
}
