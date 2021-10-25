const BASE_URL = "https://sandbox.iexapis.com/stable/"

export async function getPeers(symbol) {
  const PEERS_URL = `${BASE_URL}stock/${symbol}/relevant?token=${
    import.meta.env.VITE_IEX_TOKEN
  }`
  try {
    const response = await fetch(PEERS_URL)

    return response.json()
  } catch (error) {
    console.log(error)
  }
}
