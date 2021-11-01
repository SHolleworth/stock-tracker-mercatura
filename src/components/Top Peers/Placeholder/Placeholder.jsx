import React from "react"
import { usePlaceholderAnimation } from "../../../hooks/usePlaceholderAnimation"

function Placeholder() {
	const opacity = usePlaceholderAnimation()

	return (
		<div className="peers__placeholder" style={{ opacity: opacity }}>
			<div className="peers__placeholder__button" />
			<div className="peers__placeholder__button" />
			<div className="peers__placeholder__button" />
			<div className="peers__placeholder__button" />
			<div className="peers__placeholder__button" />
			<div className="peers__placeholder__button" />
			<div className="peers__placeholder__button" />
		</div>
	)
}

export default Placeholder
