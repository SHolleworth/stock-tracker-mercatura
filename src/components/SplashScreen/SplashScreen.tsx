import React, { useEffect, useState } from "react"
// import { CSSTransition } from 'react-transition-group';
import "./styles.css"
import logo from "../../assets/ra-logo.svg"
import ProgressBar from "./ProgressBar"
import SearchBar from "../Search/SearchBar"

interface FocusProps {
	focused: boolean
	setFocused: (focused: boolean) => void
}

const SplashScreen: React.FC<FocusProps> = ({ focused, setFocused }) => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		if (progress < 100) {
			const progressIntervalId = setInterval(() => {
				setProgress((prev) => prev + 1)
			}, 20)

			return () => clearInterval(progressIntervalId)
		}
	}, [progress])

	return (
		<div className="splashscreen">
			<img src={logo} height="120" alt="Reactive Analytics Logo" />
			{progress < 100 ? (
				<ProgressBar completed={progress} />
			) : (
				<SearchBar focused={focused} onFocus={() => setFocused(true)} />
			)}
		</div>
	)
}

export default SplashScreen
