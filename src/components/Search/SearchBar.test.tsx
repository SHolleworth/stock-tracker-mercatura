import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import SearchBar from "./SearchBar"
import FocusContextProvider from "../../contexts/FocusContext"

describe("Testing Searchbar functionality mixed with suggestions", () => {
	it("Displays suggestions on value and focus", async () => {
		render(
			<FocusContextProvider>
				<SearchBar />
			</FocusContextProvider>
		)
		const input = screen.getByPlaceholderText(
			"Enter a stock, symbol or currency"
		)
		fireEvent.focus(input)
		fireEvent.change(input, { target: { value: "A" } })
		const suggestions = await screen.findByText("Stock")
		expect(suggestions).toBeVisible()
	})

	it("Has at least one focused value when suggestion displays", async () => {
		render(
			<FocusContextProvider>
				<SearchBar />
			</FocusContextProvider>
		)
		const input = screen.getByPlaceholderText(
			"Enter a stock, symbol or currency"
		)
		fireEvent.focus(input)
		fireEvent.change(input, { target: { value: "A" } })
		const suggestions = await screen.findByRole("list")
		expect(
			suggestions.children[1].classList.contains(
				"suggestions__stock__active"
			)
		).toBeTruthy()
	})
})

// const noResults = screen.getByText("No results found")
// await waitForElementToBeRemoved(noResults)
