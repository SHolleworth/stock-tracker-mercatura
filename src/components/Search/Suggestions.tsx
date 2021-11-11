import React, { useEffect, useState } from "react"
import { useSymbol } from "../../contexts/SymbolContext"
import { useHistory } from "react-router-dom"
import "./styles.css"
import useSearch from "./hooks/useSearch"
import useKeyPress from "./hooks/useKeyPress"

interface SuggestionsProps {
	value: string
	setValue: (value: string) => void
	setFocused: (focused: boolean) => void
}
interface Suggestion {
	[key: string]: string
}

const Suggestions: React.FC<SuggestionsProps> = ({
	value,
	setValue,
	setFocused,
}) => {
	const [cursor, setCursor] = useState(0)
	const [hovered, setHovered] = useState<Suggestion>()
	const { setSymbol } = useSymbol()
	const history = useHistory()
	const suggestions = useSearch(value)
	const downPress = useKeyPress("ArrowDown")
	const upPress = useKeyPress("ArrowUp")
	const enterPress = useKeyPress("Enter")
	const escapePress = useKeyPress("Escape")

	const highlightSearch = (suggestion: string) => {
		const expression = new RegExp(value, "i")
		const match = suggestion.match(expression)
		const highlighted = match ? match.toString() : ""
		const rest = suggestion.substring(highlighted.length)

		return (
			<span>
				<strong>{highlighted}</strong>
				{rest}
			</span>
		)
	}

	const symbolSetter = (symbol: string) => {
		setSymbol(symbol)
		localStorage.setItem("currentSymbol", symbol)
		history.push("/stock")
	}

	useEffect(() => {
		if (suggestions.length && downPress) {
			setCursor((prevState) =>
				prevState < suggestions.length - 1 ? prevState + 1 : prevState
			)
		}
	}, [downPress])

	useEffect(() => {
		if (suggestions.length && upPress) {
			setCursor((prevState) =>
				prevState > 0 ? prevState - 1 : prevState
			)
		}
	}, [upPress])

	useEffect(() => {
		if (suggestions.length && enterPress) {
			symbolSetter(suggestions[cursor].symbol)
		}
	}, [cursor, enterPress])

	useEffect(() => {
		if (suggestions.length && hovered) {
			setCursor(suggestions.indexOf(hovered))
		}
	}, [hovered])

	useEffect(() => {
		if (escapePress) {
			if (localStorage.getItem("currentSymbol")) {
				history.push("/")
			} else {
				setValue("")
				setFocused(false)
			}
		}
	}, [escapePress])

	return (
		<div className="suggestions">
			<ul className="suggestions__list">
				<div className="suggestions__title">Stock</div>
				{suggestions.length === 0 ? (
					<li style={{ userSelect: "none" }}>No results found</li>
				) : (
					suggestions?.map((suggestion, i) => (
						<li
							key={i}
							className={`suggestions__stock ${
								i === cursor ? "suggestions__stock__active" : ""
							}`}
							onClick={() => symbolSetter(suggestion.symbol)}
							onMouseEnter={() => setHovered(suggestion)}
							onMouseLeave={() => setHovered(undefined)}
						>
							{highlightSearch(suggestion.symbol)} -{" "}
							{highlightSearch(suggestion.name)}
						</li>
					))
				)}
			</ul>
		</div>
	)
}

export default Suggestions
