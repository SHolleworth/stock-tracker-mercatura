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
	const [savedValue, setSavedValue] = useState("")
	const { symbol } = useSymbol()
	const { focused, setFocused } = useFocus()
	const input = useRef<HTMLInputElement>(null)

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setValue(target.value.toString())
		if (setSearchFocused) {
			if (target.value) {
				setSearchFocused(true)
			} else {
				setSearchFocused(false)
			}
		}
	}

	const handleFocus = ({ target }: { target: HTMLInputElement }) => {
		setFocused(true)
		setSavedValue(value)
		setValue("")
	}

	const handleBlur = ({ target }: { target: HTMLInputElement }) => {
		setValue(savedValue)
		setFocused(false)
	}

	const removeDefault = (event: React.KeyboardEvent) => {
		if (event.code === "ArrowUp" || event.code === "ArrowDown")
			event.preventDefault()
	}

	useEffect(() => {
		(async () => {
			if (symbol) {
				try {
					const info = await requestCompanyInfo(symbol)
					setSavedValue(`${info.symbol} - ${info.companyName}`)
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
						onFocus={handleFocus}
						onBlur={handleBlur}
						onKeyDown={removeDefault}
						ref={input}
					/>
				</div>
				{focused && value ? (
					<Suggestions value={value} setValue={setValue} />
				) : null}
			</div>
		</>
	)
}

export default SearchBar
