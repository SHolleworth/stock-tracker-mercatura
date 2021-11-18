import React from "react"
import "./App.css"
import SplashScreen from "./components/SplashScreen"
import StockScreen from "./StockScreen"
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"


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
