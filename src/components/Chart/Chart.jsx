import React, { useRef } from "react"
import { StaticYAxis } from "./CustomisedYAxis"
import { colours } from "./colours"
import "./styles.css"
import { useHistoricalPrices, useIntradayPrices } from "./hooks/usePrices"
import { useScroll } from "./hooks/useScroll"
import { HistoricalPriceChart } from "./HistoricalPriceChart"
import { CurrentPriceChart } from "./CurrentPriceChart"

const axisProps = {
	tickSize: 12,
	tickMargin: 10,
	tickLine: { stroke: colours.coreSecondary3 },
	stroke: colours.coreSecondary3,
	strokeWidth: 0.5,
	style: { fontFamily: "Roboto", userSelect: "none" },
}

const ChartContainer = () => {
	const [historicPrices, historicMinMax] = useHistoricalPrices()
	const [intradayPrices] = useIntradayPrices()
	const chartContainer = useRef(null)
	const { startScroll } = useScroll(chartContainer)
	const interval = 3
	const daySize = 1200

	if (historicPrices.length) {
		return (
			<div
				className="chart__container"
				ref={chartContainer}
				onMouseDown={startScroll}
			>
				<div className="chart__inner">
					<StaticYAxis
						data={historicPrices}
						interval={interval}
						min={historicMinMax.min}
						max={historicMinMax.max}
						axisProps={axisProps}
					/>
					<HistoricalPriceChart
						daySize={daySize}
						axisProps={axisProps}
						data={historicPrices}
						interval={interval}
						min={historicMinMax.min}
						max={historicMinMax.max}
					/>
					<CurrentPriceChart
						daySize={daySize}
						axisProps={axisProps}
						previousDayData={historicPrices.slice(0, 38)}
						data={intradayPrices}
						interval={interval}
						min={historicMinMax.min}
						max={historicMinMax.max}
					/>
				</div>
			</div>
		)
	} else {
		return null
	}
}

export default ChartContainer
