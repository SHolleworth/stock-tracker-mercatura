import React from "react"
import { useSymbol } from "../../contexts/SymbolContext"
import "./styles.css"

const Suggestions = ({ suggestions }) => {
	const { setSymbol } = useSymbol()
	return (
		<div className="suggestions">
			<ul className="suggestions__list">
				<div className="suggestions__title">Stock</div>
				{suggestions?.map((suggestion, i) => (
					<li
						key={i}
						className="suggestions__stock"
						onClick={() => setSymbol(suggestion.symbol)}
					>
						{suggestion.symbol} - {suggestion.name}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Suggestions
