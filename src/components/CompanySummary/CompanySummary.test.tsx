import React from "react"
import { render } from "@testing-library/react"
import CompanySummary from "./CompanySummary"

jest.mock("./services")

it("tests", () => {
	render(<CompanySummary />)
	expect(true)
})
