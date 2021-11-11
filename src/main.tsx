import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import FocusContextProvider from "./contexts/FocusContext"
import SymbolContextProvider from "./contexts/SymbolContext"

ReactDOM.render(
	<React.StrictMode>
		<SymbolContextProvider>
			<FocusContextProvider>
				<App />
			</FocusContextProvider>
		</SymbolContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
