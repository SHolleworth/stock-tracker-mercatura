import React, { useState } from "react"
import "./styles.css"
import LivePrice from "../LivePrice"
import SearchBar from "./SearchBar"

const StockHeader = () => {
	const [focused, setFocused] = useState(false)
	return (
		<div className={focused ? "stock__header" : "stock__header grayborder"}>
			<SearchBar focused={focused} setFocused={setFocused} />
			<LivePrice searchFocused={focused} />
		</div>
	)
}

export default StockHeader
