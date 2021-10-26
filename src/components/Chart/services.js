const base = "https://sandbox.iexapis.com/stable/"
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestIntradayPrices = async (symbol) => {
	const response = await fetch(
		`${base}/stock/${symbol}/intraday-prices?${token}&chartInterval=10`
	)
	return response.json()
}

export const requestHistoricalPrices = async (symbol) => {
	const response = await fetch(`${base}/stock/${symbol}/chart/5dm?${token}`)
	return response.json()
}
