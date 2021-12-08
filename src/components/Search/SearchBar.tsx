import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react"
import Suggestions from "./Suggestions"
import "./styles.css"
import { useFocus } from "../../contexts/FocusContext"
import { useCompanyInfoStreamWithoutSuspense } from "../CompanySummary/streams"
import { Subscribe } from "@react-rxjs/core"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"

interface SearchBarProps {
	className?: string
	setSearchFocused?: Dispatch<SetStateAction<boolean>>
}

const SearchBar = ({ className, setSearchFocused }: SearchBarProps) => {

	return (
		<ErrorBoundary fallback={<div>Error with searchbar</div>}>
		<Subscribe>
			<SearchBarContent className={className} setSearchFocused={setSearchFocused} />
		</Subscribe>
		</ErrorBoundary>
	)
}

const SearchBarContent = ({ className, setSearchFocused }: SearchBarProps) => {
	const [value, setValue] = useState("")
	const { focused, setFocused } = useFocus()
	const input = useRef<HTMLInputElement>(null)
	const info = useCompanyInfoStreamWithoutSuspense()

	useEffect(() => {
		if(info) {
			setValue(`${info.symbol} - ${info.companyName}`)
		}
		if(input.current) {
			input.current.blur()
			setFocused(false)
		}
	}, [info])

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
		setValue("")
	}

	const handleBlur = ({ target }: { target: HTMLInputElement }) => {
		if(info) {
			setValue(`${info.symbol} - ${info.companyName}`)
		}
		setFocused(false)
	}

	const removeDefault = (event: React.KeyboardEvent) => {
		if (event.code === "ArrowUp" || event.code === "ArrowDown")
			event.preventDefault()
	}


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
