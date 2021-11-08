import React, { useState, createContext, useContext } from "react"

type SymbolContextType = {
	symbol: string;
	setSymbol: ((symbol: string) => void);
}

const SymbolContext = createContext<SymbolContextType>({symbol: "AAPL", setSymbol : () => {}}) 

export const useSymbol = () => {
	return useContext(SymbolContext)
}

const SymbolContextProvider : React.FC = ({ children }) => {
	const [symbol, setSymbol] = useState("AAPL");

	return (
		<SymbolContext.Provider value={{ symbol, setSymbol }}>
			{children}
		</SymbolContext.Provider>
	)
}

export default SymbolContextProvider
