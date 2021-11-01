import React from "react"
import { usePlaceholderAnimation } from "../../../hooks/usePlaceholderAnimation"

function Placeholder() {
	const opacity = usePlaceholderAnimation()

	return (
		<div className="live-price__placeholder" style={{ opacity: opacity }}>
			<div className="live-price__placeholder__price" />
			<div className="live-price__placeholder__arrow" />
			<div className="live-price__placeholder__change" />
		</div>
	)
}

export default Placeholder
