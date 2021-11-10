import React from "react"
import logo from "../../assets/ra-logo.svg"
import { useHistory } from "react-router-dom"

interface LogoColumnPropsType {
	alignment: "center" | "stretch"
}

const LogoColumn: React.FC<LogoColumnPropsType> = ({ alignment }) => {
	const history = useHistory()
	return (
		<div className="logo-section">
			<img
				src={logo}
				height={120}
				className={`logo logo-${alignment}`}
				alt={"Reactive Analystics Logo"}
				onClick={() => history.push("/")}
			/>
		</div>
	)
}

export default LogoColumn
