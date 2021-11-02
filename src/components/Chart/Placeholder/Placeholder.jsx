import React from "react"
import { usePlaceholderAnimation } from "../../../hooks/usePlaceholderAnimation"

export function Placeholder() {
	const opacity = usePlaceholderAnimation()

	return (
		<div
			className={"chart__placeholder"}
			style={{ opacity: opacity }}
		></div>
	)
}
