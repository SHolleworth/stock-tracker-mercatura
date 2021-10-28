import React, { useState } from "react"
import Suggestions from "./Suggestions"
import useSearch from "./hooks/useSearch"
import "./styles.css"

const SearchBar = ({ onFocus, onBlur }) => {
	const [value, setValue] = useState("")
	const suggestions = useSearch(value)

	const handleChange = ({ target }) => {
		setValue(target.value)
	}

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
			{value ? <Suggestions suggestions={suggestions} /> : null}
		</div>
	)
}

export default SearchBar
