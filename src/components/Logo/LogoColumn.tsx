import React from "react"
import smallLogo from "../../assets/ra-logo.svg"
import largeLogo from "../../assets/dark-branding-logo.svg"
import { useHistory } from "react-router-dom"
import { useFocus } from "../../contexts/FocusContext"
import { useSymbol } from "../../contexts/SymbolContext"
import { symbolSubject$ } from "../../streams/symbol$"

interface LogoColumnPropsType {
	alignment: "center" | "stretch"
	className?: string
}

const LogoColumn: React.FC<LogoColumnPropsType> = ({
	alignment,
	className,
}) => {
	const history = useHistory()
	const { setSymbol } = useSymbol()
	const { setFocused } = useFocus()
	const handleClick = () => {
		setSymbol("")
		symbolSubject$.next("")
		history.push("/")
	}
	return (
		<div
			className={`logo-section ${className}`}
			onClick={() => setFocused(false)}
		>
			<img
				src={smallLogo}
				height={92}
				width={66}
				className={`logo logo-${alignment} small-logo`}
				alt={"Reactive Analystics Logo"}
				onClick={handleClick}
			/>
			<img
				src={largeLogo}
				height={60}
				className={`logo logo-${alignment} large-logo`}
				alt={"Reactive Analystics Logo"}
				onClick={handleClick}
			/>
		</div>
	)
}

export default LogoColumn
