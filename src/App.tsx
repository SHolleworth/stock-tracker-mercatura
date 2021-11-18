import React from "react"
import "./App.css"
import SplashScreen from "./components/SplashScreen"
import StockScreen from "./StockScreen"
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<SplashScreen />
					</Route>
					<Route path="/stock/:stock">
						<StockScreen />
					</Route>
					<Redirect from="/stock" to="/" />
				</Switch>
			</Router>
		</div>
	)
}

export default App
