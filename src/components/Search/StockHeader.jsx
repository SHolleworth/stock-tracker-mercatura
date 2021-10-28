import React, { useState } from "react"
import "./styles.css"
import LivePrice from "../LivePrice"
import SearchBar from "./SearchBar"

const StockHeader = () => {
	const [focused, setFocused] = useState(false)

	return (
		<div className={focused ? "stock__header" : "stock__header grayborder"}>
			<SearchBar
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
			{!focused ? <LivePrice /> : null}
		</div>
	)
}

export default StockHeader
