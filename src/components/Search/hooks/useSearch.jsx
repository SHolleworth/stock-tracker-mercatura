import { useState, useEffect } from "react"
import { getSuggestions } from "../services"

const useSearch = (value) => {
  const [suggestions, setSuggestions] = useState()

  useEffect(() => {
    if (value) {
      getSuggestions(value).then((res) => setSuggestions(res))
    }

    return () => setSuggestions(null)
  }, [value])

  return suggestions ?? null
}

export default useSearch
