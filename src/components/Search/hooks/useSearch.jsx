import { useState, useEffect } from "react"
import { getSuggestions } from "../services"

const useSearch = (value) => {
  const [suggestions, setSuggestions] = useState()

  useEffect(() => {
    if (value) {
      getSuggestions().then((res) => setSuggestions(res))
    }
  }, [value])

  return suggestions ?? ""
}

export default useSearch
