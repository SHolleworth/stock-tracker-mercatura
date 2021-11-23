import React from "react"
import { usePlaceholderAnimation } from "../../../hooks/usePlaceholderAnimation"

export function LoadingPlaceholder() {
	const opacity = usePlaceholderAnimation()

	return (
		<div
			className="chart__placeholder"
			style={{ opacity: opacity }}
			data-testid="chart-loading-placeholder"
		></div>
	)
}
