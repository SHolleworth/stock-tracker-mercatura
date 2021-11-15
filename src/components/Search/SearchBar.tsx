import React, { useEffect, useState } from "react"
import Suggestions from "./Suggestions"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import { requestCompanyInfo } from "../CompanySummary/services"
import { useFocus } from "../../contexts/FocusContext"
import { useLocation } from "react-router-dom"

const SearchBar = () => {
	const [value, setValue] = useState("")
	const { symbol } = useSymbol()
	const { focused, setFocused } = useFocus()
	const location = useLocation()

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setValue(target.value)
	}

	useEffect(() => {
		console.log(location)
		setFocused(false)
		requestCompanyInfo(symbol)
			.then((info) => {
				setValue(`${info.symbol} - ${info.companyName}`)
			})
			.catch((error) => {
				console.error(
					"Error requesting company info for search bar: " + error
				)
			})

		if (location.pathname === "/") {
			setValue("")
		}
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
