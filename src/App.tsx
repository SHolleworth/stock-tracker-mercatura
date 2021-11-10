import React from "react"
import Stats from "./components/Stats"
import Chart from "./components/Chart"
import "./App.css"
import NewsFeed from "./components/NewsFeed/NewsFeed"
import CompanySummary from "./components/CompanySummary/CompanySummary"
import TopPeers from "./components/TopPeers/TopPeers"
import StockHeader from "./components/Search/StockHeader"
import logo from "./assets/ra-logo.svg"
import Indices from "./components/Indices/Indices"

function App() {
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
