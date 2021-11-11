import React from "react"
import { useSymbol } from "../../contexts/SymbolContext"
import { useHistory } from "react-router-dom"
import "./styles.css"
import useSearch from "./hooks/useSearch"

const Suggestions: React.FC<{ value: string }> = ({ value }) => {
	const { setSymbol } = useSymbol()
	const history = useHistory()
	const suggestions = useSearch(value)

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
							className="suggestions__stock"
							onClick={() => symbolSetter(suggestion.symbol)}
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
