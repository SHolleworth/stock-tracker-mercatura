import React, { useEffect, useState } from "react"
import { useSymbol } from "../../contexts/SymbolContext"
import { useHistory } from "react-router-dom"
import "./styles.css"
import useSearch from "./hooks/useSearch"
import useKeyPress from "./hooks/useKeyPress"

interface SuggestionsProps {
	value: string
	setValue: (value: string) => void
}
interface Suggestion {
	[key: string]: string
}

const Suggestions: React.FC<SuggestionsProps> = ({ value, setValue }) => {
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

	const search = (symbol: string) => {
		setSymbol(symbol)
		history.push(`/stock/${symbol}`)
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
			search(suggestions[cursor].symbol)
		}
	}, [cursor, enterPress])

	useEffect(() => {
		if (suggestions.length && hovered) {
			setCursor(suggestions.indexOf(hovered))
		}
	}, [hovered])

	useEffect(() => {
		if (escapePress) {
			setValue("")
		}
	}, [escapePress])

	useEffect(() => {
		if (cursor > suggestions.length && suggestions.length !== 0) {
			setCursor(0)
		}
	}, [suggestions.length])

	return (
		<div className="suggestions">
			<ul
				className="suggestions__list"
				style={suggestions.length === 0 ? { padding: 0 } : {}}
			>
				{suggestions.length === 0 ? (
					<li style={{ userSelect: "none", alignItems: "center" }}>
						No results found
					</li>
				) : (
					[
						<div key="title" className="suggestions__title">
							Stock
						</div>,
						suggestions?.map((suggestion, i) => (
							<li
								key={i}
								className={`suggestions__stock ${
									i === cursor
										? "suggestions__stock__active"
										: ""
								}`}
								onClick={() => search(suggestion.symbol)}
								onMouseEnter={() => setHovered(suggestion)}
								onMouseLeave={() => setHovered(undefined)}
							>
								{highlightSearch(suggestion.symbol)} -{" "}
								{highlightSearch(suggestion.name)}
							</li>
						)),
					]
				)}
			</ul>
		</div>
	)
}

export default Suggestions
