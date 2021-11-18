import React, { useState, createContext, useContext } from "react"

interface SymbolContextType {
	symbol?: string
	setSymbol: (symbol: string) => void
}

const SymbolContext = createContext<SymbolContextType>({
	setSymbol: () => {},
})

export const useSymbol = () => {
	return useContext(SymbolContext)
}

const SymbolContextProvider: React.FC = ({ children }) => {
	const [symbol, setSymbol] = useState<string>()

	return (
		<SymbolContext.Provider value={{ symbol, setSymbol }}>
			{children}
		</SymbolContext.Provider>
	)
}

export default SymbolContextProvider
