import { useState, useEffect } from "react"
// import {
// 	requestHistoricalPrices,
// 	requestIntradayPrices,
// 	requestPreviousDayPrices,
// } from "../services"
import requestPriceData from "../services-susp"
import { Price } from "../types"

interface minMaxState {
	min: number
	max: number
}

export const useIntradayPrices = (symbol: string): [Price[]?, minMaxState?] => {
	const [prices, setPrices] = useState<Price[]>()
	const [minMax, setMinMax] = useState<minMaxState>()

	useEffect(() => {
		const prices = requestPriceData.requestIntradayPriceData(symbol).prices
		console.log("PRICES" + prices)
		setPrices(() => prices.read() as Price[])
		setMinMax(() => findMinAndMax(prices.read() as Price[]))
	}, [symbol])

	return [prices, minMax]
}

export const usePreviousClose = (symbol: string) => {
	const [previousClose, setPreviousClose] = useState()

	useEffect(() => {
		try {
			const prices =
				requestPriceData.requestPreviouDayPriceData(symbol).prices
			setPreviousClose(() => prices.read().close)
		} catch (error) {
			console.error("Failed to retrieve previous close: " + error)
		}
	}, [symbol])

	return previousClose
}

const findMinAndMax = (prices: Price[]) => {
	const averages = prices.map((el) => el.average)
	const minAverage = Math.min(...averages)
	const maxAverage = Math.max(...averages)
	const min = Math.floor(minAverage)
	const max = Math.ceil(maxAverage)
	return { min, max }
}
