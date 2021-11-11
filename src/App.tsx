import React from "react"
import "./App.css"
import SplashScreen from "./components/SplashScreen"
import StockScreen from "./StockScreen"
import { HashRouter as Router, Switch, Route } from "react-router-dom"

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<SplashScreen />
					</Route>
					<Route path="/stock">
						<StockScreen />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
