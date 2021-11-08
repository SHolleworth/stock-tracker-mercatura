import { useState, useEffect } from "react"
import { getSuggestions } from "../services"

type Suggestion = {
	[key: string] : string
}

type Suggestions = Suggestion[];

const useSearch = (value : string) => {
	const [suggestions, setSuggestions] = useState<Suggestions>([])

	useEffect(() => {
		if (value) {
			getSuggestions(value).then((res) => {
				setSuggestions(res.slice(0, -2))
			})
		}

		return () => setSuggestions([])
	}, [value])

	return suggestions ?? null
}

export default useSearch
