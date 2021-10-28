const BASE_URL = "https://sandbox.iexapis.com/stable/"

export const getSuggestions = async (value) => {
  const SEARCH_URL = `${BASE_URL}search/${value}?token=${
    import.meta.env.VITE_IEX_TOKEN
  }`
  try {
    const response = await fetch(SEARCH_URL)
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
