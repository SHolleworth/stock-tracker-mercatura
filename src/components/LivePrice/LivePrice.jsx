import React from "react"
import { useSymbol } from "../../contexts/SymbolContext"
import useLivePrice from "./useLivePrice"

const LivePrice = () => {
  const { symbol } = useSymbol()
  const price = useLivePrice(symbol)

  return <div>{price?.[0].latestPrice}</div>
}

export default LivePrice
