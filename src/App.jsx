import React, { useEffect, useState } from "react"
import Stats from "./components/Stats"
import Chart from "./components/Chart"
import "./App.css"
import NewsFeed from "./components/NewsFeed/NewsFeed"
import CompanySummary from "./components/CompanySummary/CompanySummary"
import TopPeers from "./components/Top Peers/TopPeers"
import SymbolContextProvider from "./contexts/SymbolContext"
import StockHeader from "./components/Search/StockHeader"
import logo from "./assets/ra-logo.svg"

function App() {
	const [renderFlag, setRenderFlag] = useState(0)

	useEffect(() => {
		if (renderFlag < 6) {
			setTimeout(() => {
				setRenderFlag((previous) => previous + 1)
			}, [200])
		}
	}, [renderFlag])

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
			<SymbolContextProvider>
				<div className="main-section">
					{renderFlag > 0 ? <StockHeader /> : null}
					{renderFlag > 1 ? <Chart /> : null}
					{renderFlag > 2 ? <Stats /> : null}
				</div>
				<div className="news-summary-section">
					{renderFlag > 3 ? <NewsFeed /> : null}
					{renderFlag > 4 ? <CompanySummary /> : null}
					{renderFlag > 5 ? <TopPeers /> : null}
				</div>
			</SymbolContextProvider>
		</div>
	)
}

export default App
