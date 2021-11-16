import React from "react"
import { act, render, screen, waitFor } from "@testing-library/react"

interface ComponentTestProps {
	component: React.ReactElement<any>
	mockFunctions: jest.MockedFunction<any>[]
	rejectedValues: string[]
	resolvedValues: object[]
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
	testids,
	matches,
}: ComponentTestProps) => {
	it("should show placeholder while loading", async () => {
		mockFunctions.forEach((func) => {
			func.mockImplementation(async () => {
				await new Promise(() => {})
			})
		})
		act(() => {
			render(component)
		})
		await waitFor(() =>
			expect(mockFunctions[mockFunctions.length - 1]).toHaveBeenCalled()
		)
		expect(screen.getByTestId(testids.loading)).toBeVisible()
	})

	it("should show placeholder after an error", async () => {
		mockFunctions.forEach((func, index) => {
			func.mockRejectedValue(rejectedValues[index])
		})
		act(() => {
			render(component)
		})
		await waitFor(() =>
			expect(mockFunctions[mockFunctions.length - 1]).toHaveBeenCalled()
		)
		expect(screen.getByTestId(testids.error)).toBeVisible()
	})

	it("should show the component when data is present", async () => {
		mockFunctions.forEach(async (func, index) => {
			func.mockResolvedValue(resolvedValues[index])
		})
		act(() => {
			render(component)
		})
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
