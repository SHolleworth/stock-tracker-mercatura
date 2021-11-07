import { useEffect, useState } from "react"
import { FLAGS, useRenderFlag } from "../../../contexts/RenderFlagContext"
import { requestLatestPrice } from "../services"
import STATUS from "../../../utils/statusKeys"

//Map whole body response object for the type
type Price = {
	status: string;
	body: any[];
}

const useLivePrice = (symbol : string) => {
	const [price, setPrice] = useState<Price>({ status: STATUS.LOADING, body: [] })
	const CURL_URL = `https://sandbox-sse.iexapis.com/stable/stocksUS?symbols=${symbol}&token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	const { renderFlag } = useRenderFlag()

	useEffect(() => {
		if (renderFlag > FLAGS.livePrice) {
			const sse = new EventSource(CURL_URL)

			sse.onopen = () => {
				console.log("SSE connection established")
			}

			sse.onmessage = (e) => {
				const data = JSON.parse(e.data)
				if (data.length !== 0) {
					setPrice({
						status: STATUS.RESOLVED,
						body: JSON.parse(e.data)[0],
					})
				} else {
					console.log("Just got an empty message")
				}
			}

			sse.onerror = async (error) => {
				console.log(error)
				sse.close()
				try {
					const latestPrice = await requestLatestPrice(symbol)
					setPrice({ status: STATUS.RESOLVED, body: latestPrice })
				} catch (error) {
					console.error(error)
					setPrice({ status: STATUS.ERROR, body: [] })
				}
			}

			return () => sse.close()
		} else if (renderFlag === -1) {
			setPrice({ status: STATUS.LOADING, body: [] })
		}
	}, [CURL_URL, symbol, renderFlag])

	return price
}

export default useLivePrice
