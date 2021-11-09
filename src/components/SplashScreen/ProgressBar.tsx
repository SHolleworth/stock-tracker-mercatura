import React from "react"
import "./styles.css"

const ProgressBar = ({ completed }: { completed: number }) => {
	return (
		<div className="progressbar">
			<div
				className="progress__fill"
				style={{ width: `${completed}%` }}
			></div>
		</div>
	)
}

export default ProgressBar
