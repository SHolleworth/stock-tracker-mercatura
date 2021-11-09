import React, { useState } from "react"
import "./App.css"
import SplashScreen from "./components/SplashScreen"
import StockScreen from "./StockScreen"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
	const [focused, setFocused] = useState(false)

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<SplashScreen
							focused={focused}
							setFocused={setFocused}
						/>
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
