import React from "react"
import Chart from "./Chart"
import { requestHistoricalPrices, requestIntradayPrices } from "./services"
import { screen, render } from "@testing-library/react"
import statusKeys from "../../utils/statusKeys"

jest.mock("./services")

const mockHistoricalPrices = requestHistoricalPrices as jest.MockedFunction<
	typeof requestHistoricalPrices
>
const mockIntradayPrices = requestIntradayPrices as jest.MockedFunction<
	typeof requestIntradayPrices
>

it("should show placeholder while loading", () => {
	mockHistoricalPrices.mockImplementation(async () => {
		await new Promise(() => {})
	})
	mockIntradayPrices.mockImplementation(async () => {
		await new Promise(() => {})
	})
	render(<Chart />)
	return expect(screen.getByTestId("chart-placeholder")).toBeVisible()
})

it("should show placeholder after an error", () => {
	mockHistoricalPrices.mockRejectedValue("Historical test error")
	mockIntradayPrices.mockRejectedValue("Intraday test error")
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
	mockHistoricalPrices.mockResolvedValue([
		{ status: statusKeys.RESOLVED, body: mockData },
		() => {
			return
		},
		{ min: 0, max: 20 },
	])
	mockIntradayPrices.mockResolvedValue([
		{ status: statusKeys.LOADING },
		{ min: 0, max: 20 },
	])
	render(<Chart />)
	return expect(screen.getByTestId("historic-chart")).toBeVisible()
})
