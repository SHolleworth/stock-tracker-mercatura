import React from "react"
import Stats from "./components/Stats"
import Chart from "./components/Chart"
import "./App.css"
import NewsFeed from "./components/NewsFeed/NewsFeed"

function App() {
  return (
    <div className="App">
      <div className="logo-section"></div>
      <div className="main-section">
        <Chart />
        <Stats />
      </div>
      <div className="news-summary-section">
        <NewsFeed />
      </div>
    </div>
  )
}

export default App
