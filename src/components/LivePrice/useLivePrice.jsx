import { useEffect, useState } from "react"

const useLivePrice = (symbol) => {
  const [price, setPrice] = useState()
  /*   const BASE_URL = `https://sandbox-sse.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=${
    import.meta.env.VITE_IEX_TOKEN
  }` */
  const CURL_URL = `https://sandbox-sse.iexapis.com/stable/stocksUS?symbols=${symbol}&token=${
    import.meta.env.VITE_IEX_TOKEN
  }`

  useEffect(() => {
    const sse = new EventSource(CURL_URL)

    sse.onmessage = (e) => {
      console.log(e.data)
      setPrice(JSON.parse(e.data))
    }

    sse.onerror = (error) => {
      console.log(error)
      sse.close()
    }

    return () => sse.close()
  }, [CURL_URL])

  return price
}

export default useLivePrice
