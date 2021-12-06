import React, { VFC } from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import App from "./App"
import FocusContextProvider from "./contexts/FocusContext"
import SymbolContextProvider from "./contexts/SymbolContext"
import { useRegisterSW } from "virtual:pwa-register/react"
import { ThemeProvider as MUIThemeProvider } from "@mui/material"
import { ThemeProvider } from 'styled-components'
import theme from "./theme"

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
					<MUIThemeProvider theme={theme}>
						<ThemeProvider theme={theme}>
						<App />
						</ThemeProvider>
					</MUIThemeProvider>
				</HashRouter>
			</FocusContextProvider>
		</SymbolContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
