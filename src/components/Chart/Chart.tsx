import React, { useEffect, useState } from "react"
import { colours } from "./colours"
import "./styles.css"
import { useHistoricalPrices, useIntradayPrices } from "./hooks/usePrices"
import { useDrag } from "./hooks/useDrag"
import { StaticYAxis } from "./components/CustomisedYAxis"
import { HistoricalPriceChart } from "./components/HistoricalPriceChart"
import { CurrentPriceChart } from "./components/CurrentPriceChart"
import { Placeholder } from "./Placeholder/Placeholder"
import { useSymbol } from "../../contexts/SymbolContext"
import STATUS from "../../utils/statusKeys"
import { price } from "./types"

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
	const { symbol } = useSymbol()
	const [historicPrices, setHistoricPrices, historicMinMax] =
		useHistoricalPrices(symbol)
	const [intradayPrices, intradayMinMax] = useIntradayPrices(symbol)
	const [chartContainerRef, startScroll, setScroll] = useDrag()
	const interval = 3
	const daySize = 1200
	const min = Math.min(intradayMinMax.min, historicMinMax.min)
	const max = Math.max(intradayMinMax.max, historicMinMax.max)

	useEffect(() => {
		//scroll to the latest day
		if (chartContainerRef.current) {
			setScroll(chartContainerRef.current.scrollWidth)
		}
		if (!isLoading && intradayPrices.status === STATUS.RESOLVED) {
			if (historicPrices.body && intradayPrices.body) {
				const body = [...historicPrices.body]
				body[historicPrices.body.length - 1] = {
					...body[historicPrices.body.length - 1],
					average: intradayPrices.body[0].average,
				}
				setHistoricPrices({ status: historicPrices.status, body: body })
			}
		}
	}, [isLoading])

	useEffect(() => {
		if (
			intradayPrices.status !== STATUS.LOADING &&
			historicPrices.status === STATUS.RESOLVED
		) {
			setIsLoading(false)
		} else {
			setIsLoading(true)
		}
	}, [intradayPrices, historicPrices])

	const chartRenderer = () => {
		const content = []
		if (
			historicPrices.status === STATUS.LOADING &&
			intradayPrices.status === STATUS.LOADING
		) {
			return <Placeholder />
		} else if (
			historicPrices.status === STATUS.ERROR &&
			intradayPrices.status === STATUS.ERROR
		) {
			return <Placeholder />
		} else if (
			historicPrices.status === STATUS.LOADING &&
			intradayPrices.status === STATUS.ERROR
		) {
			return <Placeholder />
		} else if (
			historicPrices.status === STATUS.ERROR &&
			intradayPrices.status === STATUS.LOADING
		) {
			return <Placeholder />
		} else if (
			historicPrices.status === STATUS.ERROR &&
			intradayPrices.status === STATUS.RESOLVED
		) {
			return <Placeholder />
		} else if (
			historicPrices.status === STATUS.LOADING &&
			intradayPrices.status === STATUS.RESOLVED
		) {
			return <Placeholder />
		} else if (historicPrices.status === STATUS.RESOLVED) {
			content.push(
				<StaticYAxis
					key={0}
					data={historicPrices.body || intradayPrices.body}
					min={min}
					max={max}
					axisProps={axisProps}
				/>
			)
			content.push(
				<HistoricalPriceChart
					key={1}
					daySize={daySize}
					axisProps={axisProps}
					data={historicPrices.body}
					interval={interval}
					min={min}
					max={max}
				/>
			)
			if (intradayPrices.status === STATUS.RESOLVED) {
				if (!historicPrices.body) {
					return
				}
				content.push(
					<CurrentPriceChart
						key={2}
						daySize={daySize}
						axisProps={axisProps}
						previousDayData={filterOutPreviousDay(
							historicPrices.body
						)}
						currentDayData={intradayPrices.body}
						interval={interval}
						min={min}
						max={max}
					/>
				)
			}
		} else {
			throw Error(
				`Unrecognised state status in Chart component: \nHistorical Prices Status: ${historicPrices.status}\nIntraday Prices Status: ${intradayPrices.status}`
			)
		}
		return <div className="chart__inner">{content}</div>
	}

	return (
		<div
			className="chart__container"
			ref={chartContainerRef}
			onMouseDown={startScroll}
			data-testid="historic-chart"
		>
			{chartRenderer()}
		</div>
	)
}

const filterOutPreviousDay = (prices : price[]) => {
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
