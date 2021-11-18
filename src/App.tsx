import React, { useEffect } from "react"
import SplashScreen from "./screens/SplashScreen"
import StockScreen from "./screens/StockScreen/StockScreen"
import { Switch, Route } from "react-router-dom"
import { useSymbol } from "./contexts/SymbolContext"

function App() {
	const { symbol } = useSymbol()

	console.log("SYMBOL: " + symbol)

	useEffect(() => {}, [])

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
