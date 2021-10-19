<<<<<<< HEAD
const base = "https://sandbox.iexapis.com/stable/"
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestIntradayPrices = async (symbol) => {
  const response = await fetch(
    `${base}/stock/${symbol}/intraday-prices?${token}&chartInterval=10`
  )
=======
import t from "../../../../token"

const base = "https://sandbox.iexapis.com/stable/"
const token = `token=${t}`

export const requestHistoricalPrices = async () => {
  const response = await fetch(`${base}/stock/AAPL/intraday-prices?${token}`)
>>>>>>> 52e13a3 (feat(Chart): hooked the IEX Cloud intraday-prices endpoint into the chart)
  return response.json()
}
