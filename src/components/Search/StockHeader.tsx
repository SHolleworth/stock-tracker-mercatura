import React from "react"
import "./styles.css"
import LivePrice from "../LivePrice"
import SearchBar from "./SearchBar"

type FocusProps = {
	focused: boolean
	setFocused: (focused: boolean) => void
}

const StockHeader: React.FC<FocusProps> = ({ focused, setFocused }) => {
	return (
		<div className={focused ? "stock__header" : "stock__header grayborder"}>
			<SearchBar focused={focused} setFocused={setFocused} />
			<LivePrice searchFocused={focused} />
		</div>
	)
}

export default StockHeader
