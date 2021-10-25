import React, { useState, useEffect } from "react"
import KeyStatistics from "./KeyStatistics"
import { getKeyStatistics } from "./services"
import { useSymbol } from "../../contexts/SymbolContext"

const Stats = () => {
  const [statistics, setStatistics] = useState({})
  const { symbol } = useSymbol()

  useEffect(() => {
    getKeyStatistics(symbol)
      .then((res) => setStatistics(res))
      .catch((err) => console.error(err))
  }, [symbol])

	return (
		<>
			{Object.keys(statistics).length === 0 ? (
				"Loading..."
			) : (
				<KeyStatistics stats={statistics} />
			)}
		</>
	)
}

export default Stats
