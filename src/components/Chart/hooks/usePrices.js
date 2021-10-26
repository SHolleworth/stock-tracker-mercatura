import { useState, useEffect } from "react"
import { requestHistoricalPrices, requestIntradayPrices } from "../services"
import { useSymbol } from "../../../contexts/SymbolContext"

const removeNulls = (prices) => {
	return prices.filter((price) => {
		return price.average !== null
	})
}

export const useHistoricalPrices = () => {
	const [prices, setPrices] = useState([])
	const [minMax, setMinMax] = useState({ min: 0, max: 0 })
	const { symbol } = useSymbol()

	useEffect(() => {
		requestHistoricalPrices(symbol)
			.then((prices) => {
				const pricesWithoutNulls = removeNulls(prices)
				const averages = pricesWithoutNulls.map((el) => el.average)
				const min = Math.floor(Math.min(...averages))
				const max = Math.floor(Math.max(...averages) + 1)
				setMinMax({ min, max })
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
			.catch((err) => console.error(err))
	}, [symbol])

	return [prices, minMax]
}

export const useIntradayPrices = () => {
	const [prices, setPrices] = useState([])
	const [minMax, setMinMax] = useState({ min: 0, max: 0 })
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
			.catch((err) => console.error(err))
	}, [symbol])

	return [prices, minMax]
}
