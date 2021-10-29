import React, { useEffect, useState } from "react"
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
	const [isLoading, setIsLoading] = useState(true)
	const [historicPrices, setHistoricPrices, historicMinMax] =
		useHistoricalPrices()
	const [intradayPrices, intradayMinMax] = useIntradayPrices()
	// const [intradayPrices, setIntradayPrices] = useState(mockIntraday)
	const [chartContainerRef, startScroll, setScroll] = useDrag()
	const interval = 3
	const daySize = 1200
	const min = Math.min(intradayMinMax.min, historicMinMax.min)
	const max = Math.max(intradayMinMax.max, historicMinMax.max)

	useEffect(() => {
		//scroll to the latest day
		setScroll(chartContainerRef.current.scrollWidth)
		if (!isLoading && intradayPrices.length) {
			const temp = [...historicPrices]
			console.log("Temp before change")
			console.log(temp)
			temp[historicPrices.length - 1] = {
				...temp[historicPrices.length - 1],
				average: intradayPrices[0].average,
			}
			console.log("Temp after change")
			console.log(temp)
			setHistoricPrices(temp)
		}
	}, [isLoading])

	useEffect(() => {
		if (intradayPrices && historicPrices && historicPrices.length) {
			setIsLoading(false)
		} else {
			setIsLoading(true)
		}
	}, [intradayPrices, historicPrices])

	const chartRenderer = () => {
		const elements = []
		if (!historicPrices && !intradayPrices) {
			return "LOADING"
		}
		if (historicPrices) {
			if (historicPrices.length) {
				elements.push(
					<StaticYAxis
						key={0}
						data={historicPrices || intradayPrices}
						interval={interval}
						min={min}
						max={max}
						axisProps={axisProps}
					/>
				)
				elements.push(
					<HistoricalPriceChart
						key={1}
						daySize={daySize}
						axisProps={axisProps}
						data={historicPrices}
						interval={interval}
						min={min}
						max={max}
					/>
				)
				if (intradayPrices && intradayPrices.length) {
					elements.push(
						<CurrentPriceChart
							key={2}
							daySize={daySize}
							axisProps={axisProps}
							previousDayData={filterOutPreviousDay(
								historicPrices
							)}
							currentDayData={intradayPrices}
							interval={interval}
							min={min}
							max={max}
						/>
					)
				}
			} else {
				return "NO HISTORIC DATA"
			}
		}
		if (historicPrices && intradayPrices) {
			if (!historicPrices.length && !intradayPrices.length) {
				return "NO DATA"
			}
		}
		return elements
	}

	return (
		<div
			className="chart__container"
			ref={chartContainerRef}
			onMouseDown={startScroll}
		>
			<div className="chart__inner">{chartRenderer()}</div>
		</div>
	)
}

const filterOutPreviousDay = (prices) => {
	console.log(prices)
	try {
		const yesterday = prices[prices.length - 1].date
		return prices.filter((price) => price.date === yesterday).slice(0, -1)
	} catch (error) {
		console.error(
			"Error filtering previous day in chart from prices array: " + error
		)
		console.error("Prices array: ")
		console.error(prices)
	}
}

export default ChartContainer
