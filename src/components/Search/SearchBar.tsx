import React, { useEffect, useState } from "react"
import Suggestions from "./Suggestions"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import { requestCompanyInfo } from "../CompanySummary/services"
import { useFocus } from "../../contexts/FocusContext"

const SearchBar = () => {
	const [value, setValue] = useState("")
	const { symbol } = useSymbol()
	const { focused, setFocused } = useFocus()

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setValue(target.value)
	}

	useEffect(() => {
		(async () => {
			if (symbol) {
				try {
					setFocused(false)
					const info = await requestCompanyInfo(symbol)
					setValue(`${info.symbol} - ${info.companyName}`)
				} catch (error) {
					console.error(
						"Error requesting company info for search bar: " + error
					)
				}
			}
		})()
	}, [symbol])

	return (
		<>
			<div className="searchbar">
				<div className="field">
					<input
						type="text"
						id="search"
						value={value}
						placeholder="Enter a stock, symbol or currency"
						autoComplete="off"
						onChange={handleChange}
						onFocus={() => setFocused(true)}
					/>
				</div>
				{focused && value ? (
					<Suggestions
						value={value}
						setValue={setValue}
						setFocused={setFocused}
					/>
				) : null}
			</div>
		</>
	)
}

export default SearchBar
