import React from "react"
import SplashScreen from "./screens/SplashScreen"
import StockScreen from "./screens/StockScreen/StockScreen"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/stock/:stock">
						<StockScreen />
					</Route>
					<Route exact path="/">
						<SplashScreen />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
