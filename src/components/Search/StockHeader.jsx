import React from "react"
import "./styles.css"
import LivePrice from "../LivePrice"
import SearchBar from "./SearchBar"

const StockHeader = ({ focused, setFocused }) => {
	return (
		<div className={focused ? "stock__header" : "stock__header grayborder"}>
			<SearchBar focused={focused} onFocus={() => setFocused(true)} />
			<LivePrice searchFocused={focused} />
		</div>
	)
}

export default StockHeader
