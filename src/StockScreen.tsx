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
import { useFocus } from "./contexts/FocusContext"

const StockScreen = () => {
	const { symbol } = useSymbol()
	const history = useHistory()
	const { setFocused } = useFocus()

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
				<div onClick={() => setFocused(false)}>
					<Chart />
					<Stats />
					<Indices />
				</div>
			</div>
			<div
				className="news-summary-section"
				onClick={() => setFocused(false)}
			>
				<NewsFeed />
				<CompanySummary />
				<TopPeers />
			</div>
		</>
	)
}

export default StockScreen
