import React from "react"
import logo from "../../assets/ra-logo.svg"

interface LogoColumnPropsType {
	setFocused: (focused: boolean) => void
	alignment: "center" | "stretch"
}

const LogoColumn: React.FC<LogoColumnPropsType> = ({
	alignment,
	setFocused,
}) => {
	return (
		<div className="logo-section" onClick={() => setFocused(false)}>
			<img
				src={logo}
				height={120}
				className={"logo"}
				alt={"Reactive Analystics Logo"}
				style={{ alignSelf: alignment }}
			/>
		</div>
	)
}

export default LogoColumn
