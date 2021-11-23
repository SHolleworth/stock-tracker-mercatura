import React, { VFC } from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import App from "./App"
import FocusContextProvider from "./contexts/FocusContext"
import SymbolContextProvider from "./contexts/SymbolContext"
import { useRegisterSW } from "virtual:pwa-register/react"

const RegisterSW: VFC = () => {
	useRegisterSW({ onRegistered: () => console.log("SW Registered") })
	return <></>
}

ReactDOM.render(
	<React.StrictMode>
		<SymbolContextProvider>
			<FocusContextProvider>
				<HashRouter basename={"/"}>
					<RegisterSW />
					<App />
				</HashRouter>
			</FocusContextProvider>
		</SymbolContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
