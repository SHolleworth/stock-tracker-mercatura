import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react"
import Suggestions from "./Suggestions"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import { requestCompanyInfo } from "../CompanySummary/services"
import { useFocus } from "../../contexts/FocusContext"

interface SearchBarProps {
	className?: string
	setSearchFocused?: Dispatch<SetStateAction<boolean>>
}

const SearchBar = ({ className, setSearchFocused }: SearchBarProps) => {
	const [value, setValue] = useState("")
	const { symbol } = useSymbol()
	const { focused, setFocused } = useFocus()
	const input = useRef<HTMLInputElement>(null)

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setValue(target.value)
		if (setSearchFocused) {
			if (target.value) {
				setSearchFocused(true)
			} else {
				setSearchFocused(false)
			}
		}
	}

	useEffect(() => {
		(async () => {
			if (symbol) {
				try {
					const info = await requestCompanyInfo(symbol)
					setValue(`${info.symbol} - ${info.companyName}`)
					if (input.current) {
						setFocused(false)
						input.current.blur()
					}
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
			<div className={`searchbar ${className}`}>
				<div className="field">
					<input
						className="searchbar__input"
						type="text"
						id="search"
						value={value}
						placeholder="Enter a stock, symbol or currency"
						autoComplete="off"
						onChange={handleChange}
						onFocus={() => setFocused(true)}
						ref={input}
					/>
				</div>
				{focused && value ? (
					<Suggestions value={value} setValue={setValue} />
				) : null}
			</div>
			<div
				className="search__clickable-area"
				hidden={!focused}
				onClick={() => {
					setFocused(false)
				}}
			/>
		</>
	)
}

export default SearchBar
