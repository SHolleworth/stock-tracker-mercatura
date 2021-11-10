import React from "react"
import logo from "../../assets/ra-logo.svg"
import "./styles.css"

const ProgressBar = ({ completed }: { completed: number }) => {
	return (
		<>
			<img src={logo} height="120" alt="Reactive Analytics Logo" />
			<div className="progressbar">
				<div
					className="progress__fill"
					style={{ width: `${completed}%` }}
				></div>
			</div>
		</>
	)
}

export default ProgressBar
