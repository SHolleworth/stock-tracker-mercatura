const t = import.meta.env.VITE_IEX_TOKEN

const base = "https://sandbox.iexapis.com/stable/"
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestIntradayPrices = async () => {
  const response = await fetch(
    `${base}/stock/AAPL/intraday-prices?${token}&chartInterval=10`
  )
  return response.json()
}
