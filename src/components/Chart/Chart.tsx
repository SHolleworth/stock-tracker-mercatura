import React from "react"
import { colours } from "./colours"
import "./styles.css"
import { useIntradayPrices, usePreviousClose } from "./hooks/usePrices"
import { CurrentPriceChart } from "./components/CurrentPriceChart"
import { LoadingPlaceholder } from "./Placeholders/LoadingPlaceholder"
import { useSymbol } from "../../contexts/SymbolContext"
import STATUS from "../../utils/statusKeys"
import { ErrorPlaceholder } from "./Placeholders/ErrorPlaceholder"

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
	const { symbol } = useSymbol()
	const [intradayPrices, { min, max }] = useIntradayPrices(symbol)
	const previousClose = usePreviousClose(symbol)
	const interval = 3

	const chartRenderer = () => {
		if (intradayPrices.status === STATUS.LOADING) {
			return <LoadingPlaceholder />
		}
		if (intradayPrices.status === STATUS.ERROR) {
			return <ErrorPlaceholder />
		}
		if (intradayPrices.status === STATUS.RESOLVED) {
			if (intradayPrices.body) {
				return (
					<CurrentPriceChart
						axisProps={axisProps}
						currentDayData={intradayPrices.body}
						previousClose={
							previousClose ? previousClose : undefined
						}
						interval={interval}
						max={max}
						min={min}
					/>
				)
			}
		}
		return <LoadingPlaceholder />
	}

	return (
		<div className="chart__container" data-testid="historic-chart">
			{chartRenderer()}
		</div>
	)
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
