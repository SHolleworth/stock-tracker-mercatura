const BASE_URL = "https://sandbox.iexapis.com/stable/"
const QUOTE_URL = `${BASE_URL}stock/AAPL/quote?token=${
  import.meta.env.VITE_IEX_TOKEN
}`
const FUNDAMENTALS_URL = `${BASE_URL}time-series/FUNDAMENTAL_VALUATIONS/AAPL?token=${
  import.meta.env.VITE_IEX_TOKEN
}`

export async function getKeyStatistics() {
  try {
    const quoteResponse = await fetch(QUOTE_URL)
    const fundamentalsResponse = await fetch(FUNDAMENTALS_URL)

    const quote = await quoteResponse.json()
    const fundamentals = await fundamentalsResponse.json()

    const content = { ...quote, ...fundamentals[0] }
    return content
  } catch (err) {
    console.log("Error: ", err)
  }
}
