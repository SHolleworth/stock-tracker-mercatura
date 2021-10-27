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
		requestHistoricalPrices(symbol)
			.then((prices) => {
				const pricesWithoutNulls = removeNulls(prices)
				const averages = pricesWithoutNulls.map((el) => el.average)
				const min = Math.floor(Math.min(...averages))
				const max = Math.floor(Math.max(...averages) + 1)
				setMinMax({ min, max })
				pricesWithoutNulls.push({
					...pricesWithoutNulls[pricesWithoutNulls.length - 1],
					minute: "16:00",
				})
				const pricesWithIdentifiableMinutes = pricesWithoutNulls.map(
					(price, index) => {
						return {
							...price,
							minute: index.toString() + " " + price.minute,
						}
					}
				)
				setPrices(pricesWithIdentifiableMinutes)
			})
			.catch((err) =>
				console.error("Error retrieving historical prices: " + err)
			)
	}, [symbol])

	return [prices, minMax]
}

export const useIntradayPrices = () => {
	const [prices, setPrices] = useState(null)
	const [minMax, setMinMax] = useState({
		min: Number.POSITIVE_INFINITY,
		max: Number.NEGATIVE_INFINITY,
	})
	const { symbol } = useSymbol()

	useEffect(() => {
		requestIntradayPrices(symbol)
			.then((prices) => {
				const pricesWithoutNulls = removeNulls(prices)
				const averages = pricesWithoutNulls.map((el) => el.average)
				const min = Math.floor(Math.min(...averages))
				const max = Math.floor(Math.max(...averages) + 1)
				setMinMax({ min, max })
				setPrices(pricesWithoutNulls)
			})
			.catch((err) =>
				console.error("Error retrieving intraday prices: " + err)
			)
	}, [symbol])

	return [prices, minMax]
}
