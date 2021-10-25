import React from "react"
import Stats from "./components/Stats"
import Chart from "./components/Chart"
import "./App.css"
import NewsFeed from "./components/NewsFeed/NewsFeed"
import CompanySummary from "./components/CompanySummary/CompanySummary"
import TopPeers from "./components/Top Peers/TopPeers"
import SymbolContextProvider from "./contexts/SymbolContext"
import LivePrice from "./components/LivePrice"

function App() {
  return (
    <div className="App">
      <div className="logo-section"></div>
      <SymbolContextProvider>
        <div className="main-section">
          <LivePrice />
          <Chart />
          <Stats />
        </div>
        <div className="news-summary-section">
          <NewsFeed />
          <CompanySummary />
          <TopPeers />
        </div>
      </SymbolContextProvider>
    </div>
  )
}

export default App
