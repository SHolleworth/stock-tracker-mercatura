import React from "react"
import "./App.css"
import SplashScreen from "./components/SplashScreen"
import StockScreen from "./StockScreen"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom"

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/stock-tracker-mercatura">
						<SplashScreen />
					</Route>
					<Route path="stock-tracker-mercatura/stock/:stock">
						<StockScreen />
					</Route>
					<Redirect
						from="/stock-tracker-mercatura/stock/"
						to="/stock-tracker-mercatura"
					/>
				</Switch>
			</Router>
		</div>
	)
}

export default App
