import { useState, useEffect } from "react"
// import { getSuggestions } from "../services"
import rawData from "../../../assets/symbolsAndNames"

interface Suggestion {
	[key: string]: string
}

type Suggestions = Suggestion[]

const useSearch = (value: string) => {
	const [suggestions, setSuggestions] = useState<Suggestions>([])
	const [companySymbolsAndNames, setCompanySymbolsAndNames] = useState<
		[] | Suggestion[]
	>([])

	useEffect(() => {
		const jsonSymbolsAndNames = JSON.parse(rawData) as Suggestion[]
		setCompanySymbolsAndNames(jsonSymbolsAndNames)
	}, [])

	useEffect(() => {
		searchJSON(value, companySymbolsAndNames).then((res) => {
			setSuggestions(res)
		})
		return () => setSuggestions([])
	}, [value, companySymbolsAndNames])

	return suggestions ?? null
}

const searchJSON = (
	value: string,
	data: Suggestion[]
): Promise<Suggestion[]> => {
	return new Promise((resolve, reject) => {
		const suggestionsWithWeight1 = []
		const suggestionsWithWeight2 = []
		const suggestionsWithWeight3 = []

		const chars = value.length
		let i = 0
		while (i < data.length) {
			let weight = 0
			if (
				data[i].symbol.slice(0, chars).toLowerCase() ===
				value.toLowerCase()
			) {
				weight += 2
			}
			if (
				data[i].name.slice(0, chars).toLowerCase() ===
				value.toLowerCase()
			) {
				weight += 1
			}
			switch (weight) {
				case 1:
					suggestionsWithWeight1.push(data[i])
					break
				case 2:
					suggestionsWithWeight2.push(data[i])
					break
				case 3:
					suggestionsWithWeight3.push(data[i])
					break
			}
			i++
		}
		const suggestions = suggestionsWithWeight3
			.concat(suggestionsWithWeight2, suggestionsWithWeight1)
			.slice(0, 8)
		return resolve(suggestions)
	})
}

export default useSearch
