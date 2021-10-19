import t from "../../../../token"

const base = "https://sandbox.iexapis.com/stable/"
const token = `token=${t}`

export const requestHistoricalPrices = async () => {
  const response = await fetch(`${base}/stock/AAPL/intraday-prices?${token}`)
  return response.json()
}
