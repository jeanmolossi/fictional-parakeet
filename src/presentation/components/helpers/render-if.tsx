import React from 'react'

interface RenderIfProps {
	condition: boolean
	children?: React.ReactNode | JSX.Element
}

const RenderIf = ({ condition, children }: RenderIfProps) => {
	if (condition) {
		return <>{children}</>
	}

	return null
}

export default RenderIf
