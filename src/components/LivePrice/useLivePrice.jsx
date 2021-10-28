import { useEffect, useState } from "react"
import { requestLatestPrice } from "./services"

const useLivePrice = (symbol) => {
	const [price, setPrice] = useState()
	const CURL_URL = `https://sandbox-sse.iexapis.com/stable/stocksUS?symbols=${symbol}&token=${
		import.meta.env.VITE_IEX_TOKEN
	}`

	useEffect(() => {
		const sse = new EventSource(CURL_URL)

		sse.onopen = () => {
			console.log("SSE connection established")
		}

		sse.onmessage = (e) => {
			if (JSON.parse(e.data).length !== 0) {
				setPrice(JSON.parse(e.data))
			} else {
				console.log("Just got an empty message")
			}
		}

		sse.onerror = async (error) => {
			console.log(error)
			sse.close()
			try {
				const latestPrice = await requestLatestPrice(symbol)
				setPrice([latestPrice])
			} catch (error) {
				console.error(error)
				setPrice([])
			}
		}

		return () => sse.close()
	}, [CURL_URL, symbol])

	return price
}

export default useLivePrice
/*
[
  {
    avgTotalVolume: 7486593,
    calculationPrice: "close",
    change: 0.31,
    changePercent: 0.00245,
    close: 136.66,
    closeSource: "iofcifla",
    closeTime: 1662749987289,
    companyName: "Qualcomm, Inc.",
    currency: "USD",
    delayedPrice: 137.45,
    delayedPriceTime: 1657945668940,
    extendedChange: 0.76,
    extendedChangePercent: 0.00568,
    extendedPrice: 136.79,
    extendedPriceTime: 1687354891027,
    high: 138.59,
    highSource: " erctp i5uedlm1dieya en",
    highTime: 1689222840409,
    iexAskPrice: 0,
    iexAskSize: 0,
    iexBidPrice: 0,
    iexBidSize: 0,
    iexClose: 132.91,
    iexCloseTime: 1652986007577,
    iexLastUpdated: 0,
    iexMarketPercent: null,
    iexOpen: 134.95,
    iexOpenTime: 1707036259757,
    iexRealtimePrice: 0,
    iexRealtimeSize: 0,
    iexVolume: 0,
    lastTradeTime: 1711813797311,
    latestPrice: 137.44,
    latestSource: "Close",
    latestTime: "October 25, 2021",
    latestUpdate: 1690847603494,
    latestVolume: 4153526,
    low: 132.4,
    lowSource: " tu1e epnmyddleire5cai ",
    lowTime: 1657928338598,
    marketCap: 150762300843,
    oddLotDelayedPrice: 134.11,
    oddLotDelayedPriceTime: 1665953568347,
    open: 134,
    openTime: 1658400806094,
    openSource: "flcofaii",
    peRatio: 16.63,
    previousClose: 134.5,
    previousVolume: 5292513,
    primaryExchange: "ASNDQA",
    symbol: "QCOM",
    volume: 0,
    week52High: 168.39,
    week52Low: 119.3,
    ytdChange: -0.1224420774451382,
  }
]
 */
