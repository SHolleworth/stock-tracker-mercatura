import React, { useState, useEffect } from "react"
import KeyStatistics from "./KeyStatistics"
import { getKeyStatistics } from "./services"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholder/Placeholder"
import { FLAGS, useRenderFlag } from "../../contexts/RenderFlagContext"
import STATUS from "../../utils/statusKeys"

const Stats = () => {
	const [statistics, setStatistics] = useState({
		status: STATUS.LOADING,
		body: null,
	})
	const { symbol } = useSymbol()
	const { renderFlag } = useRenderFlag()

	const requestData = async () => {
		try {
			const response = await getKeyStatistics(symbol)
			setStatistics({ status: STATUS.RESOLVED, body: response })
		} catch (error) {
			console.error("Error requesting key statistic data: " + error)
			setStatistics({ status: STATUS.ERROR, body: null })
		}
	}

	useEffect(() => {
		if (renderFlag === FLAGS.stats) {
			requestData()
		} else if (renderFlag === -1) {
			setStatistics({ status: STATUS.LOADING, body: null })
		}
	}, [symbol, renderFlag])

	const statsRenderer = () => {
		let content = null
		if (statistics.status === STATUS.LOADING) {
			content = <Placeholder />
		} else if (statistics.status === STATUS.ERROR) {
			content = <Placeholder />
		} else if (statistics.status === STATUS.RESOLVED) {
			content = <KeyStatistics stats={statistics.body} />
		} else {
			throw Error(
				`Unrecognised state status in stats component: ` +
					statistics.status
			)
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
