import React, { useEffect } from "react"
import SplashScreen from "./screens/SplashScreen"
import StockScreen from "./screens/StockScreen/StockScreen"
import { Switch, Route, useHistory } from "react-router-dom"
import ROUTES from "./utils/routes"
import { useSymbol } from "./contexts/SymbolContext"

function App() {
	const history = useHistory()
	const { symbol } = useSymbol()

	console.log("SYMBOL: " + symbol)

	useEffect(() => {
		console.log("AFTER MOUNTING APP")
		if (history.length < 1) {
			history.push(ROUTES.base)
		}
		return () => console.log("UNMOUNTING APP")
	}, [])

	return (
		<div className="App">
			<Switch>
				<Route path={`${ROUTES.base}stock/:stock`}>
					<StockScreen />
				</Route>
				<Route path={ROUTES.base}>
					<SplashScreen />
				</Route>
			</Switch>
		</div>
	)
}

export default App
