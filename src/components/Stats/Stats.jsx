import React, { useState, useEffect } from "react"
import KeyStatistics from "./KeyStatistics"
import { getKeyStatistics } from "./services"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholder/Placeholder"
import { FLAGS, useRenderFlag } from "../../contexts/RenderFlagContext"

const Stats = () => {
	const [statistics, setStatistics] = useState({
		status: "loading",
		body: null,
	})
	const { symbol } = useSymbol()
	const { renderFlag } = useRenderFlag()

	const requestData = async () => {
		try {
			const response = await getKeyStatistics(symbol)
			setStatistics({ status: "resolved", body: response })
		} catch (error) {
			console.error("Error requesting key statistic data: " + error)
			setStatistics({ status: "error", body: null })
		}
	}

	useEffect(() => {
		if (renderFlag === FLAGS.stats) {
			requestData()
		}
	}, [symbol, renderFlag])

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
