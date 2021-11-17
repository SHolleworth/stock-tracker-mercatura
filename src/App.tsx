import React, { useEffect } from "react"
import SplashScreen from "./screens/SplashScreen"
import StockScreen from "./screens/StockScreen/StockScreen"
import { Switch, Route, useHistory } from "react-router-dom"
import ROUTES from "./utils/routes"

function App() {
	const history = useHistory()

	useEffect(() => {
		history.push(ROUTES.base)
	}, [])

	return (
		<div className="App">
			<Switch>
				<Route path={`${ROUTES.base}stock/:stock`}>
					<StockScreen />
				</Route>
				<Route exact path={ROUTES.base}>
					<SplashScreen />
				</Route>
			</Switch>
		</div>
	)
}

export default App
