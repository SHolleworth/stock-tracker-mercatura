import React from "react"
import "./styles.css"
import LivePrice from "../LivePrice"
import SearchBar from "./SearchBar"
import { useFocus } from "../../contexts/FocusContext"

const StockHeader = () => {
	const { focused } = useFocus()

	return (
		<div className={focused ? "stock__header" : "stock__header grayborder"}>
			<SearchBar />
			<LivePrice searchFocused={focused} />
		</div>
	)
}

export default StockHeader
