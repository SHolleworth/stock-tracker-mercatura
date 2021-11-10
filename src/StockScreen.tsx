import React, { useEffect } from "react"
import Stats from "./components/Stats"
import Chart from "./components/Chart"
import "./App.css"
import NewsFeed from "./components/NewsFeed/NewsFeed"
import CompanySummary from "./components/CompanySummary/CompanySummary"
import StockHeader from "./components/Search/StockHeader"
import Indices from "./components/Indices/Indices"
import LogoColumn from "./components/Logo/LogoColumn"
import TopPeers from "./components/TopPeers/TopPeers"
import { useHistory } from "react-router-dom"
import { useSymbol } from "./contexts/SymbolContext"

const StockScreen = () => {
	const { symbol } = useSymbol()
	const history = useHistory()

	useEffect(() => {
		if (!symbol) {
			history.push("/")
		}
	}, [])

	return (
		<>
			<LogoColumn alignment="stretch" />
			<div className="main-section">
				<StockHeader />
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
