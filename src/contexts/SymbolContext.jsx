import React, { useState, createContext, useContext } from "react"

const SymbolContext = createContext("AAPL")

export const useSymbol = () => {
  return useContext(SymbolContext)
}

const SymbolContextProvider = ({ children }) => {
  const [symbol, setSymbol] = useState("AAPL")

  return (
    <SymbolContext.Provider value={{ symbol, setSymbol }}>
      {children}
    </SymbolContext.Provider>
  )
}

export default SymbolContextProvider
