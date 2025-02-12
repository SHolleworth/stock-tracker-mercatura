import React from "react"
import { usePlaceholderAnimation } from "../../../hooks/usePlaceholderAnimation"

function Placeholder() {
	const opacity = usePlaceholderAnimation()

	return (
		<div style={{ opacity: opacity }}>
			<div className="news__placeholder">
				<div className="news__placeholder__title"></div>
				<div className="news__placeholder__title news__placeholder__title--short"></div>
				<div className="news__placeholder__footer"></div>
			</div>
			<div className="news__placeholder">
				<div className="news__placeholder__title"></div>
				<div className="news__placeholder__title news__placeholder__title--short"></div>
				<div className="news__placeholder__footer"></div>
			</div>
			<div className="news__placeholder">
				<div className="news__placeholder__title"></div>
				<div className="news__placeholder__title news__placeholder__title--short"></div>
				<div className="news__placeholder__footer"></div>
			</div>
		</div>
	)
}

export default Placeholder
