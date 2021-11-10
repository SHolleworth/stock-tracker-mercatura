import React from "react"
import { useSymbol } from "../../contexts/SymbolContext"
import { useHistory } from "react-router-dom"
import "./styles.css"
import useSearch from "./hooks/useSearch"

const Suggestions: React.FC<{ value: string }> = ({ value }) => {
	const { setSymbol } = useSymbol()
	const history = useHistory()
	const suggestions = useSearch(value)

	const symbolSetter = (symbol: string) => {
		setSymbol(symbol)
		localStorage.setItem("currentSymbol", symbol)
		history.push("/stock")
	}

	return (
		<div className="suggestions">
			<ul className="suggestions__list">
				<div className="suggestions__title">Stock</div>
				{suggestions?.map((suggestion, i) => (
					<li
						key={i}
						className="suggestions__stock"
						onClick={() => symbolSetter(suggestion.symbol)}
					>
						{suggestion.symbol} - {suggestion.name}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Suggestions
