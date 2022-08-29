import { useCallback, useEffect, useState } from 'react'

export const BREAKPOINTS = {
	0: 'xs',
	600: 'sm',
	900: 'md',
	1200: 'lg',
	1536: 'xl'
} as const

type Breakpoint = keyof typeof BREAKPOINTS
type BreakpointStr = typeof BREAKPOINTS[Breakpoint]
type LazyCalc = (width: number) => void
type UseWidthFrom = [number, BreakpointStr, LazyCalc]

export function useWidthFrom (el: HTMLElement | number): UseWidthFrom {
	const elWidth = typeof el === 'number' ? el : el.clientWidth
	const [breakpoint, setBreakpoint] = useState<BreakpointStr>('xs')

	useEffect(() => {
		setBreakpoint(updateBreakpoint(elWidth))
	}, [elWidth])

	const updateBreakpoint = useCallback((width: number) => {
		const breakpoints = Object.keys(BREAKPOINTS).map(Number)

		const breakpoint: Breakpoint = breakpoints.reduce((acc, curr) => {
			if (curr <= width) {
				return curr
			}

			return acc
		}, 1e32) as Breakpoint

		return BREAKPOINTS[breakpoint]
	}, [elWidth])

	const lazyCalc = useCallback((lazyWidth: number) => {
		setBreakpoint(updateBreakpoint(lazyWidth))
	}, [])

	return [elWidth, breakpoint, lazyCalc]
}
