import React from "react"
import { usePlaceholderAnimation } from "../../../hooks/usePlaceholderAnimation"

function LoadingPlaceholder() {
	const opacity = usePlaceholderAnimation()
	return (
		<div
			className="index__placeholder"
			data-testid="index-placeholder"
			style={{ opacity: opacity }}
		></div>
	)
}

export default LoadingPlaceholder
