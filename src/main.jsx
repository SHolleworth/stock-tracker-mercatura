import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import RenderFlagContextProvider from "./contexts/RenderFlagContext"
import SymbolContextProvider from "./contexts/SymbolContext"

ReactDOM.render(
	<React.StrictMode>
		<RenderFlagContextProvider>
			<SymbolContextProvider>
				<App />
			</SymbolContextProvider>
		</RenderFlagContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
