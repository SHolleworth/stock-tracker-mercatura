import React, { useEffect } from "react"
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
	const [intradayPrices, intradayMinMax] = useIntradayPrices()
	const [chartContainerRef, startScroll, setScroll] = useDrag()
	const interval = 3
	const daySize = 1200
	const min = Math.min(intradayMinMax.min, historicMinMax.min)
	const max = Math.max(intradayMinMax.max, historicMinMax.max)
	let showingCurrentPriceChart = false
	let previousDayPrices = []

	if (intradayPrices && historicPrices) {
		previousDayPrices = filterOutPreviousDay(historicPrices)
		//If the market hasn't opened intraday prices will be the previous days prices
		showingCurrentPriceChart =
			intradayPrices[0].date !== previousDayPrices[0].date
	}

	useEffect(() => {
		setScroll(chartContainerRef.current.scrollWidth)
	}, [intradayPrices, historicPrices])

	return (
		<div
			className="chart__container"
			ref={chartContainerRef}
			onMouseDown={startScroll}
		>
			<div className="chart__inner">
				{historicPrices || showingCurrentPriceChart ? (
					<StaticYAxis
						data={historicPrices}
						interval={interval}
						min={min}
						max={max}
						axisProps={axisProps}
					/>
				) : null}
				{historicPrices ? (
					<HistoricalPriceChart
						daySize={daySize}
						axisProps={axisProps}
						data={historicPrices}
						interval={interval}
						min={min}
						max={max}
					/>
				) : null}
				{showingCurrentPriceChart ? (
					<CurrentPriceChart
						daySize={daySize}
						axisProps={axisProps}
						previousDayData={previousDayPrices}
						currentDayData={intradayPrices}
						interval={interval}
						min={min}
						max={max}
					/>
				) : null}
			</div>
		</div>
	)
}

const filterOutPreviousDay = (prices) => {
	const yesterday = prices[prices.length - 1].date
	return prices.filter((price) => price.date === yesterday)
}

export default ChartContainer
