import React, { SetStateAction, useEffect, useState } from "react"
import Suggestions from "./Suggestions"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import { requestCompanyInfo } from "../CompanySummary/services"

<<<<<<< HEAD
type Props = {
	focused: boolean
	setFocused: React.Dispatch<SetStateAction<boolean>>
	onFocus: () => void
}

const SearchBar: React.FC<Props> = ({ focused, setFocused, onFocus }) => {
=======
interface Props {
	focused: boolean
	onFocus: () => void
}

const SearchBar: React.FC<Props> = ({ focused, onFocus }) => {
>>>>>>> feat: added first loading screen
	const [value, setValue] = useState("")
	const { symbol } = useSymbol()

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setValue(target.value)
	}

	useEffect(() => {
		requestCompanyInfo(symbol)
			.then((info) => {
				setValue(`${info.symbol} - ${info.companyName}`)
			})
			.catch((error) => {
				console.error(
					"Error requesting company info for search bar: " + error
				)
			})
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
						onFocus={onFocus}
					/>
				</div>
				{focused ? <Suggestions value={value} /> : null}
			</div>
			{focused ? (
				<div
					className="clickableArea"
					onClick={() => setFocused(false)}
				/>
			) : null}
		</>
	)
}

export default SearchBar
