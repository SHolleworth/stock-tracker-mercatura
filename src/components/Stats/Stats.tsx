import React, { useState, useEffect } from "react"
import KeyStatisticsTable from "./KeyStatistics"
import { getKeyStatistics } from "./services"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholder/Placeholder"
import { FLAGS, useRenderFlag } from "../../contexts/RenderFlagContext"
import STATUS from "../../utils/statusKeys"
import { StatusStringType } from "../../utils/statusKeys"
import { KeyStatistics } from "./stats"

interface StatisticsState {
	status: StatusStringType;
	body?: KeyStatistics
}


const Stats = () => {
	const [statistics, setStatistics] = useState<StatisticsState>({	status: STATUS.LOADING })
	const { symbol } = useSymbol()
	const { renderFlag } = useRenderFlag()

	const requestData = async () => {
		try {
			const response = await getKeyStatistics(symbol)
			setStatistics({ status: STATUS.RESOLVED, body: response })
		} catch (error) {
			console.error("Error requesting key statistic data: " + error)
			setStatistics({ status: STATUS.ERROR })
		}
	}

	useEffect(() => {
		if (renderFlag === FLAGS.stats) {
			requestData()
		} else if (renderFlag === -1) {
			setStatistics({ status: STATUS.LOADING })
		}
	}, [symbol, renderFlag])

	const statsRenderer = () => {
		let content = null
		if (statistics.status === STATUS.LOADING) {
			content = <Placeholder />
		} else if (statistics.status === STATUS.ERROR) {
			content = <Placeholder />
		} else if (statistics.status === STATUS.RESOLVED) {
			// is this really neccesary?
			content = statistics.body ? <KeyStatisticsTable stats={statistics.body} /> : null;
		} else {
			throw Error(
				`Unrecognised state status in stats component: ` +
					statistics.status
			)
		}
		return (
			<div className="stats">
				<h2 className="stats__title section-heading">Key Statistics</h2>
				{content}
			</div>
		)
	}

	return statsRenderer()
}

export default Stats
