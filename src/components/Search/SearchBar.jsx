import React, { useEffect, useState } from "react"
import Suggestions from "./Suggestions"
import useSearch from "./hooks/useSearch"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import { requestCompanyInfo } from "../CompanySummary/services"

const SearchBar = ({ focused, onFocus, onBlur }) => {
	const [value, setValue] = useState("")
	const suggestions = useSearch(value)
	const { symbol } = useSymbol()

	const handleChange = ({ target }) => {
		setValue(target.value)
	}

	useEffect(() => {
		requestCompanyInfo(symbol)
			.then((info) => {
				setValue(`${info.symbol} - ${info.companyName}`)
			})
			.catch((error) => {
				console.error(
					"Error requesting company info for search bar: " + error
				)
			})
	}, [symbol])

	return (
		<div className="searchbar">
			<div className="field">
				<input
					type="text"
					id="search"
					value={value}
					placeholder="Enter a stock, symbol or currency"
					onChange={handleChange}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			</div>
			{focused ? <Suggestions suggestions={suggestions} /> : null}
		</div>
	)
}

export default SearchBar
