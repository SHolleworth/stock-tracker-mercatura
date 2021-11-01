import React, { useState, useEffect } from "react"
import KeyStatistics from "./KeyStatistics"
import { getKeyStatistics } from "./services"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholder/Placeholder"

const Stats = () => {
	const [statistics, setStatistics] = useState({
		status: "loading",
		body: null,
	})
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

	const statsRenderer = () => {
		let content = null
		if (statistics.status === "resolved") {
			content = <KeyStatistics stats={statistics.body} />
		} else if (
			statistics.status === "loading" ||
			statistics.status === "error"
		) {
			content = <Placeholder />
		}
		return (
			<div className="stats">
				<h2 className="stats__title">Key Statistics</h2>
				{content}
			</div>
		)
	}

	return statsRenderer()
}

export default Stats
