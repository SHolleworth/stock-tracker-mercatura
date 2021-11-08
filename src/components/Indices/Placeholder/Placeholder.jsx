import React from "react"
import { usePlaceholderAnimation } from "../../../hooks/usePlaceholderAnimation"

function Placeholder() {
	const opacity = usePlaceholderAnimation()
	return (
		<div className="index__placeholder" style={{ opacity: opacity }}></div>
	)
}

export default Placeholder
