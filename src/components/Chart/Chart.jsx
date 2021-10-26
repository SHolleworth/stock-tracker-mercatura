import React from "react"
import { StaticYAxis } from "./CustomisedYAxis"
import { colours } from "./colours"
import "./styles.css"
import { useHistoricalPrices, useIntradayPrices } from "./hooks/usePrices"
import { useDrag } from "./hooks/useDrag"
import { HistoricalPriceChart } from "./HistoricalPriceChart"
import { CurrentPriceChart } from "./CurrentPriceChart"

const axisProps = {
	tickSize: 12,
	tickMargin: 10,
	tickLine: { stroke: colours.coreSecondary3 },
	stroke: colours.coreSecondary3,
	strokeWidth: 0.5,
	style: { fontFamily: "Roboto", userSelect: "none", fill: colours.keys },
}

const ChartContainer = () => {
	const [historicPrices, historicMinMax] = useHistoricalPrices()
	const [intradayPrices] = useIntradayPrices()
	const [chartContainerRef, startScroll] = useDrag()
	const interval = 3
	const daySize = 1200

	if (historicPrices.length) {
		return (
			<div
				className="chart__container"
				ref={chartContainerRef}
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
