import React from "react"
import Chart from "./Chart"
import { useHistoricalPrices, useIntradayPrices } from "./hooks/usePrices"
import { screen, render } from "@testing-library/react"
import statusKeys from "../../utils/statusKeys"

jest.mock("./hooks/usePrices")

it("should show placeholder while loading", () => {
	useHistoricalPrices.mockReturnValue([
		{ status: statusKeys.LOADING, body: null },
		() => {
			return
		},
		{ min: 0, max: 20 },
	])
	useIntradayPrices.mockReturnValue([
		{ status: statusKeys.LOADING, body: null },
		{ min: 0, max: 20 },
	])
	render(<Chart />)
	return expect(screen.getByTestId("chart-placeholder")).toBeVisible()
})

it("should show placeholder after an error", () => {
	useHistoricalPrices.mockReturnValue([
		{ status: statusKeys.ERROR, body: null },
		() => {
			return
		},
		{ min: 0, max: 20 },
	])
	useIntradayPrices.mockReturnValue([
		{ status: statusKeys.LOADING, body: null },
		{ min: 0, max: 20 },
	])
	render(<Chart />)
	return expect(screen.getByTestId("chart-placeholder")).toBeVisible()
})

const mockData = [
	{ average: 100, date: "date", minute: "09:30" },
	{ average: 100, date: "date", minute: "09:40" },
	{ average: 100, date: "date", minute: "09:50" },
	{ average: 100, date: "date", minute: "10:00" },
	{ average: 100, date: "date", minute: "10:00" },
	{ average: 100, date: "date", minute: "10:10" },
	{ average: 100, date: "date", minute: "10:20" },
	{ average: 100, date: "date", minute: "10:30" },
	{ average: 100, date: "date", minute: "10:40" },
	{ average: 100, date: "date", minute: "10:50" },
	{ average: 100, date: "date", minute: "11:00" },
	{ average: 100, date: "date", minute: "11:10" },
]

it("should show the chart when data is present", async () => {
	useHistoricalPrices.mockReturnValue([
		{ status: statusKeys.RESOLVED, body: mockData },
		() => {
			return
		},
		{ min: 0, max: 20 },
	])
	useIntradayPrices.mockReturnValue([
		{ status: statusKeys.LOADING, body: null },
		{ min: 0, max: 20 },
	])
	render(<Chart />)
	return expect(screen.getByTestId("historic-chart")).toBeVisible()
})
