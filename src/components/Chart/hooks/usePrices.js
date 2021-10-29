import { useState, useEffect } from "react"
import { requestHistoricalPrices, requestIntradayPrices } from "../services"
import { useSymbol } from "../../../contexts/SymbolContext"

const removeNulls = (prices) => {
	return prices.filter((price) => {
		return price.average !== null
	})
}

export const useHistoricalPrices = () => {
	const [prices, setPrices] = useState(null)
	const [minMax, setMinMax] = useState({
		min: Number.POSITIVE_INFINITY,
		max: Number.NEGATIVE_INFINITY,
	})
	const { symbol } = useSymbol()

	useEffect(() => {
		(async () => {
			try {
				const prices = await requestHistoricalPrices(symbol)

				console.log("Historic prices retrieved: ")
				console.log(prices)

				const pricesWithoutNulls = removeNulls(prices)

				setMinMax(findMinAndMax(pricesWithoutNulls))

				//Add a point to the end of the last day to make it's length consistent with the others
				if (pricesWithoutNulls.length) {
					pricesWithoutNulls.push({
						...pricesWithoutNulls[pricesWithoutNulls.length - 1],
						minute: "16:00",
					})
				}

				//Minutes must be unique in order for the reference areas to work
				//TODO find a less stupid solution
				const pricesWithIdentifiableMinutes = pricesWithoutNulls.map(
					(price, index) => {
						return {
							...price,
							minute: index.toString() + " " + price.minute,
						}
					}
				)

				setPrices(pricesWithIdentifiableMinutes)
			} catch (error) {
				//an empty array will signal the request failed
				setPrices([])
			}
		})()
	}, [symbol])

	return [prices, setPrices, minMax]
}

export const useIntradayPrices = () => {
	const [prices, setPrices] = useState(null)
	const [minMax, setMinMax] = useState({
		min: Number.POSITIVE_INFINITY,
		max: Number.NEGATIVE_INFINITY,
	})
	const { symbol } = useSymbol()

	useEffect(() => {
		(async () => {
			try {
				const prices = await requestIntradayPrices(symbol)

				console.log("Intraday prices retrieved: ")
				console.log(prices)

				const pricesWithoutNulls = removeNulls(prices)

				setMinMax(findMinAndMax(pricesWithoutNulls))

				setPrices(pricesWithoutNulls)
			} catch (error) {
				setPrices([])
			}
		})()
	}, [symbol])

	return [prices, minMax]
}

const findMinAndMax = (prices) => {
	const averages = prices.map((el) => el.average)
	const min = Math.floor(Math.min(...averages))
	const max = Math.floor(Math.max(...averages) + 1)
	return { min, max }
}
