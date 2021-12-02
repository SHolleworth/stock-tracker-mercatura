import { useState, useEffect } from "react"
import { Price } from "../types"
import {
	requestIntradayPricesStream,
	requestPreviousDayPricesStream,
} from "../streams"

interface minMaxState {
	min: number
	max: number
}

export const useIntradayPrices = (symbol: string): [Price[]?, minMaxState?] => {
	const [prices, setPrices] = useState<Price[]>()
	const [minMax, setMinMax] = useState<minMaxState>()

	useEffect(() => {
		requestIntradayPricesStream(symbol).subscribe({
			next: (resource) => {
				setPrices(() => resource.prices.read() as Price[])
				setMinMax(() =>
					findMinAndMax(resource.prices.read() as Price[])
				)
			},
			error: (error) => {
				console.log(error)
				setPrices(() => {
					throw Error(error)
				})
			},
		})
	}, [symbol])

	return [prices, minMax]
}

export const usePreviousClose = (symbol: string) => {
	const [previousClose, setPreviousClose] = useState()

	useEffect(() => {
		try {
			requestPreviousDayPricesStream(symbol).subscribe({
				next: (resource) => {
					setPreviousClose(() => resource.prices.read().close)
				},
				error: (error) => {
					console.error(
						"Error loading previous day close: " + error.message
					)
				},
			})
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
