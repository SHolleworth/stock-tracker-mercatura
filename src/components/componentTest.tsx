import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import SymbolContextProvider from "../contexts/SymbolContext"
import { PriceState } from "./LivePrice/hooks/useLivePrice"
import { StatusStringType } from "../utils/statusKeys"

interface ComponentTestProps {
	component: React.ReactElement<any>
	mockFunctions: jest.MockedFunction<any>[]
	rejectedValues?: string[] | PriceState[]
	resolvedValues?: object[]
	returnedValues?: {
		resolved: {
			status: StatusStringType
			body?: any
		}
		loading: {
			status: StatusStringType
			body?: any
		}
		error: {
			status: StatusStringType
			body?: any
		}
	}
	testids: {
		resolved?: string
		loading: string
		error: string
	}
	matches: string[]
}

export const componentTest = ({
	component,
	mockFunctions,
	rejectedValues,
	resolvedValues,
	returnedValues,
	testids,
	matches,
}: ComponentTestProps) => {
	it("should show placeholder while loading", async () => {
		mockFunctions.forEach((func) => {
			if (returnedValues) {
				func.mockReturnValue(returnedValues.loading)
			} else {
				func.mockImplementation(async () => {
					await new Promise(() => {})
				})
			}
		})
		render(<SymbolContextProvider>{component}</SymbolContextProvider>)
		await waitFor(() =>
			expect(mockFunctions[mockFunctions.length - 1]).toHaveBeenCalled()
		)
		expect(screen.getByTestId(testids.loading)).toBeVisible()
	})

	it("should show placeholder after an error", async () => {
		mockFunctions.forEach((func, index) => {
			if (returnedValues) {
				func.mockReturnValue(returnedValues.error)
			}
			if (rejectedValues) {
				func.mockRejectedValue(rejectedValues[index])
			}
		})
		render(<SymbolContextProvider>{component}</SymbolContextProvider>)
		await waitFor(() =>
			expect(mockFunctions[mockFunctions.length - 1]).toHaveBeenCalled()
		)
		expect(screen.getByTestId(testids.error)).toBeVisible()
	})

	it("should show the component when data is present", async () => {
		mockFunctions.forEach(async (func, index) => {
			if (returnedValues) {
				func.mockReturnValue(returnedValues.resolved)
			}
			if (resolvedValues) {
				func.mockResolvedValue(resolvedValues[index])
			}
		})
		render(<SymbolContextProvider>{component}</SymbolContextProvider>)
		await waitFor(async () =>
			expect(mockFunctions[mockFunctions.length - 1]).toHaveBeenCalled()
		)
		if (testids.resolved) {
			expect(screen.getByTestId(testids.resolved)).toBeVisible()
		}
		if (matches.length) {
			matches.forEach((match) => {
				return expect(screen.getByText(match)).toBeVisible()
			})
		}
	})
}
