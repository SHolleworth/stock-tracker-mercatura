import React, { useState, useEffect } from "react"
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

function App() {
	const [focused, setFocused] = useState(false)
	const { symbol } = useSymbol()
	const { setRenderFlag } = useRenderFlag()

	useEffect(() => {
		setRenderFlag(-1)
		const intervalId = setInterval(() => {
			setRenderFlag((prev) => prev + 1)
		}, [200])
		setTimeout(() => {
			clearInterval(intervalId)
		}, [Object.keys(FLAGS).length * 200])
	}, [symbol])

	return (
		<div className="App">
			<div className="logo-section" onClick={() => setFocused(false)}>
				<img
					src={logo}
					height={120}
					className={"logo"}
					alt={"Reactive Analystics Logo"}
				/>
			</div>

			<div className="main-section">
				<StockHeader focused={focused} setFocused={setFocused} />
				<Chart />
				<Stats />
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
