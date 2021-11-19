import React from "react"
import SplashScreen from "./screens/SplashScreen"
import StockScreen from "./screens/StockScreen/StockScreen"
import { Switch, Route } from "react-router-dom"
import "./App.css"

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path={`/stock/:stock`}>
					<StockScreen />
				</Route>
				<Route exact path={`/`}>
					<SplashScreen />
				</Route>
			</Switch>
		</div>
	)
}

export default App
