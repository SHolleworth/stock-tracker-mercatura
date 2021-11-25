import React from "react"
import {
	render,
	screen,
	waitForElementToBeRemoved,
	within,
} from "@testing-library/react"
import Suggestions from "./Suggestions"

describe("Testing suggestion main functionality", () => {
	it("Displays No results found when value is empty", () => {
		render(<Suggestions value={""} setValue={() => null} />)
		const list = screen.getByRole("listitem")
		expect(list.textContent).toBe("No results found")
	})

	it("Displays the expected amount of values from certain inputs", async () => {
		render(<Suggestions value={"te"} setValue={() => null} />)
		const list = screen.getByRole("list")
		const noResults = screen.getByText("No results found")
		await waitForElementToBeRemoved(noResults)
		const { getAllByRole } = within(list)
		const items = getAllByRole("listitem")
		console.log(items)
		expect(items.length).toBe(8)
	})

	it("Displays No results found from value: aaaa", () => {
		render(<Suggestions value={"aaaa"} setValue={() => null} />)
		const list = screen.getByRole("listitem")
		expect(list.textContent).toBe("No results found")
	})

	it("Displays No results found from value: sdsdsdsdsdsd", () => {
		render(<Suggestions value={"sdsdsdsdsdsd"} setValue={() => null} />)
		const list = screen.getByRole("listitem")
		expect(list.textContent).toBe("No results found")
	})
})
