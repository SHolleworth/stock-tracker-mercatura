import React, { useState } from "react"
import Stats from "./components/Stats"
import Chart from "./components/Chart"
import "./App.css"
import NewsFeed from "./components/NewsFeed/NewsFeed"
import CompanySummary from "./components/CompanySummary/CompanySummary"
import StockHeader from "./components/Search/StockHeader"
import Indices from "./components/Indices/Indices"
import LogoColumn from "./components/Logo/LogoColumn"
import TopPeers from "./components/TopPeers/TopPeers"

const StockScreen = () => {
	const [focused, setFocused] = useState(false)

	return (
		<>
			<LogoColumn alignment="stretch" setFocused={setFocused} />
			<div className="main-section">
				<StockHeader focused={focused} setFocused={setFocused} />
				<Chart />
				<Stats />
				<Indices />
			</div>
			<div className="news-summary-section">
				<NewsFeed />
				<CompanySummary />
				<TopPeers />
			</div>
		</>
	)
}

export default StockScreen
