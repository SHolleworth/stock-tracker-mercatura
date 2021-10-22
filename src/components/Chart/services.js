import t from "../../../../token"

const base = "https://sandbox.iexapis.com/stable/"
const token = `token=${t}`

export const requestIntradayPrices = async () => {
  const response = await fetch(
    `${base}/stock/AAPL/intraday-prices?${token}&chartInterval=2`
  )
  return response.json()
}
