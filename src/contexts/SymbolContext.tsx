import React, { useState, createContext, useContext } from "react"

export interface SymbolContextType {
	symbol: string
	setSymbol: (symbol: string) => void
}

export const SymbolContext = createContext<SymbolContextType>({
	symbol: "",
	setSymbol: () => {},
})

export const useSymbol = () => {
	return useContext(SymbolContext)
}

interface SymbolContextProviderProps {
	children: React.ReactNode
}

const SymbolContextProvider = ({ children }: SymbolContextProviderProps) => {
	const [symbol, setSymbol] = useState<string>("")

	return (
		<SymbolContext.Provider value={{ symbol, setSymbol }}>
			{children}
		</SymbolContext.Provider>
	)
}

export default SymbolContextProvider
