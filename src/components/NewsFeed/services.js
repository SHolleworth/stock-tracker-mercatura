import t from "../../../../token"

const base = "https://sandbox.iexapis.com/stable/"
const token = `token=${t}`

export const requestNews = async (symbol) => {
  try {
    const response = await fetch(`${base}/stock/${symbol}/news/last/3?${token}`)
    return response.json()
  } catch (error) {
    console.error(error)
  }
}
