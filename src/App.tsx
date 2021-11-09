import React, { useEffect } from "react"
import Stats from "./components/Stats"
import Chart from "./components/Chart"
import "./App.css"
import NewsFeed from "./components/NewsFeed/NewsFeed"
import CompanySummary from "./components/CompanySummary/CompanySummary"
import TopPeers from "./components/Top Peers/TopPeers"
import StockHeader from "./components/Search/StockHeader"
import logo from "./assets/ra-logo.svg"
import { FLAGS, useRenderFlag } from "./contexts/RenderFlagContext"
import { useSymbol } from "./contexts/SymbolContext"
import Indices from "./components/Indices/Indices"

function App() {
	const { symbol } = useSymbol()
	const { setRenderFlag } = useRenderFlag()

	useEffect(() => {
		setRenderFlag(-1)
		const intervalId = setInterval(() => {
			setRenderFlag((prev) => prev + 1)
		}, 200)
		setTimeout(() => {
			clearInterval(intervalId)
		}, Object.keys(FLAGS).length * 300)
	}, [symbol])

	return (
		<div className="App">
			<div className="logo-section">
				<img
					src={logo}
					height={120}
					className={"logo"}
					alt={"Reactive Analystics Logo"}
				/>
			</div>

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
		</div>
	)
}

export default App
