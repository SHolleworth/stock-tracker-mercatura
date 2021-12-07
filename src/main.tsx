import React, { VFC } from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import App from "./App"
import FocusContextProvider from "./contexts/FocusContext"
import SymbolContextProvider from "./contexts/SymbolContext"
import { useRegisterSW } from "virtual:pwa-register/react"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme"
import { Subscribe } from "@react-rxjs/core"

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
						<ThemeProvider theme={theme}>
							<App />
						</ThemeProvider>
					</HashRouter>
			</FocusContextProvider>
		</SymbolContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
