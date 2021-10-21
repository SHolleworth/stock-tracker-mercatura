import React from "react"
import Stats from "./components/KeyStatistics/Stats"
import KeyStatistics from "./components/KeyStatistics"
import Chart from "./components/Chart"
import "./App.css"
import NewsFeed from "./components/NewsFeed/NewsFeed"

function App() {
  return (
    <div className="App">
      <Stats />
      <KeyStatistics />
      <Chart />
      {/* <KeyStatistics /> */}
      <div className="main-section">
        <Chart />
        <KeyStatistics />
      </div>
      <div className="news-summary-section">
        <NewsFeed />
      </div>
    </div>
  )
}

export default App
