import React from "react"
import Stats from "./components/KeyStatistics/Stats"
import KeyStatistics from "./components/KeyStatistics"
import Chart from "./components/Chart"
import "./App.css"

function App() {
  return (
    <div className="App">
      <Stats />
      <KeyStatistics />
      <Chart />
      {/* <KeyStatistics /> */}
    </div>
  )
}

export default App
