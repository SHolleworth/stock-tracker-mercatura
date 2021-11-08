import React from "react"
import { usePlaceholderAnimation } from "../../../hooks/usePlaceholderAnimation"

function Placeholder() {
	const opacity = usePlaceholderAnimation()

	return (
		<div className="stats__placeholder" style={{ opacity: opacity }}>
			<div className="stats__placeholder__column">
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
			</div>

			<div className="stats__placeholder__column stats__placeholder__column__center">
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
			</div>

			<div className="stats__placeholder__column">
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
				<div className="stats__placeholder__row">
					<div className="stats__placeholder__row__title" />
					<div className="stats__placeholder__row__content" />
				</div>
			</div>
		</div>
	)
}

export default Placeholder
