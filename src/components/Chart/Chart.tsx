import React from "react"
import { colours } from "./colours"
import "./styles.css"
import { useIntradayPrices, usePreviousClose } from "./hooks/usePrices"
import { CurrentPriceChart } from "./components/CurrentPriceChart"
import { LoadingPlaceholder } from "./Placeholders/LoadingPlaceholder"
import { useSymbol } from "../../contexts/SymbolContext"
import { ErrorPlaceholder } from "./Placeholders/ErrorPlaceholder"
import { StaticYAxis } from "./components/CustomisedYAxis"
import { useDrag } from "./hooks/useDrag"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"

const style: React.CSSProperties = {
	fontFamily: "Roboto",
	userSelect: "none",
	fill: colours.keys,
}

const axisProps = {
	tickSize: 12,
	tickMargin: 10,
	tickLine: { stroke: colours.coreSecondary3 },
	stroke: colours.coreSecondary3,
	strokeWidth: 0.5,
	style: style,
}

const Chart = () => {
	const [chartRef, startDrag] = useDrag()

	return (
		<div
			className="chart__container"
			ref={chartRef}
			onMouseDown={startDrag}
			data-testid="intraday-chart"
		>
			<div className={`chart__inner`}>
				<ErrorBoundary fallback={<ErrorPlaceholder />}>
					<ChartContent />
				</ErrorBoundary>
			</div>
		</div>
	)
}

const ChartContent = () => {
	const { symbol } = useSymbol()
	const [intradayPrices, { min, max }] = useIntradayPrices(symbol)
	const previousClose = usePreviousClose(symbol)
	const interval = 3

	if (intradayPrices.body) {
		return (
			<>
				<StaticYAxis
					axisProps={axisProps}
					data={intradayPrices.body}
					max={max}
					min={min}
				/>
				<CurrentPriceChart
					axisProps={axisProps}
					currentDayData={intradayPrices.body}
					previousClose={previousClose ? previousClose : undefined}
					interval={interval}
					max={max}
					min={min}
				/>
			</>
		)
	}

	return <LoadingPlaceholder />
}

// const filterOutPreviousDay = (prices: price[]) => {
// 	try {
// 		const yesterday = prices[prices.length - 1].date
// 		return prices.filter((price) => price.date === yesterday).slice(0, -1)
// 	} catch (error) {
// 		console.error(
// 			"Error filtering previous day in chart from prices array: " + error
// 		)
// 		console.error("Prices array: ")
// 		console.error(prices)
// 	}
// }

export default Chart
