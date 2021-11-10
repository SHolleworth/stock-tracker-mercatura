import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import SymbolContextProvider from "./contexts/SymbolContext"

ReactDOM.render(
	<React.StrictMode>
		<SymbolContextProvider>
			<App />
		</SymbolContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
