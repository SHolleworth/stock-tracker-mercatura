import React, { useState, useEffect } from "react"
import KeyStatistics from "./KeyStatistics"
import { getKeyStatistics } from "./services"
import { useSymbol } from "../../contexts/SymbolContext"

const Stats = () => {
	const [statistics, setStatistics] = useState(null)
	const { symbol } = useSymbol()

	useEffect(() => {
		getKeyStatistics(symbol)
			.then((res) => {
				console.log("Response: ")
				console.log(res)
				setStatistics(res)
			})
			.catch((err) => console.error(err))
	}, [symbol])

	if (statistics) {
		if (statistics.error) {
			return statistics.body
		}
		return <KeyStatistics stats={statistics.body} />
	}
	return "Loading..."
}

export default Stats
