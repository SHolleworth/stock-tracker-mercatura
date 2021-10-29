import React, { useEffect, useState } from "react"
import Stats from "./components/Stats"
import Chart from "./components/Chart"
import "./App.css"
import NewsFeed from "./components/NewsFeed/NewsFeed"
import CompanySummary from "./components/CompanySummary/CompanySummary"
import TopPeers from "./components/Top Peers/TopPeers"
import { useSymbol } from "./contexts/SymbolContext"
import StockHeader from "./components/Search/StockHeader"
import logo from "./assets/ra-logo.svg"

function App() {
	const [renderFlag, setRenderFlag] = useState(0)
	const { symbol } = useSymbol()
	const [focused, setFocused] = useState(false)

	useEffect(() => {
		if (renderFlag < 6) {
			setTimeout(() => {
				setRenderFlag((previous) => previous + 1)
			}, [200])
		}
	}, [renderFlag])

	useEffect(() => {
		setRenderFlag(0)
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
				{renderFlag > 0 ? (
					<StockHeader focused={focused} setFocused={setFocused} />
				) : null}
				{renderFlag > 1 ? <Chart /> : null}
				{renderFlag > 2 ? <Stats /> : null}
			</div>
			<div className="news-summary-section">
				{renderFlag > 3 ? <NewsFeed /> : null}
				{renderFlag > 4 ? <CompanySummary /> : null}
				{renderFlag > 5 ? <TopPeers /> : null}
			</div>
		</div>
	)
}

export default App
