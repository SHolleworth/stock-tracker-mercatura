import React, { useState, createContext, useContext } from "react"

const SymbolContext = createContext("AAPL")

export const useSymbol = () => {
  return useContext(SymbolContext)
}

const SymbolContextProvider = ({ children }) => {
  const [symbol, setSymbol] = useState("AAPL")

  return (
    <SymbolContextProvider value={{ symbol, setSymbol }}>
      {children}
    </SymbolContextProvider>
  )
}

export default SymbolContextProvider
