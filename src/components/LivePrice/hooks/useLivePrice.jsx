import { useEffect, useState } from "react"

const useLivePrice = (symbol) => {
  const [price, setPrice] = useState()
  const CURL_URL = `https://sandbox-sse.iexapis.com/stable/stocksUS?symbols=${symbol}&token=${
    import.meta.env.VITE_IEX_TOKEN
  }`

  useEffect(() => {
    const sse = new EventSource(CURL_URL)

    sse.onmessage = (e) => {
      if (JSON.parse(e.data).length !== 0) {
        setPrice(JSON.parse(e.data))
      } else {
        console.log("Just got an empty message")
      }
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
