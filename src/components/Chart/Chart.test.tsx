import React from "react"
import Chart from "./Chart"
import { requestHistoricalPrices, requestIntradayPrices } from "./services"
import { componentTest } from "../componentTest"

jest.mock("./services")

const mockHistoricalPrices = requestHistoricalPrices as jest.MockedFunction<
	typeof requestHistoricalPrices
>
const mockIntradayPrices = requestIntradayPrices as jest.MockedFunction<
	typeof requestIntradayPrices
>

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

componentTest({
	component: <Chart />,
	mockFunctions: [mockHistoricalPrices, mockIntradayPrices],
	rejectedValues: [
		"Test error historical prices",
		"Test error intraday prices",
	],
	resolvedValues: [mockData, mockData],
	testids: {
		loading: "chart-placeholder",
		error: "chart-placeholder",
		resolved: "historic-chart",
	},
	matches: [],
})
