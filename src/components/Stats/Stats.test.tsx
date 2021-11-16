import React from "react"
import Stats from "."
import { componentTest } from "../componentTest"
import { requestKeyStatistics } from "./services"

jest.mock("./services")

const mockStats = requestKeyStatistics as jest.MockedFunction<
	typeof requestKeyStatistics
>

const mockData = {
	open: 10,
	high: 20,
	low: 5,
	previousClose: 15,
	week52High: 25,
	week52Low: 1,
	marketCap: 25300,
	peRatio: 0.8,
	dividendYield: 12,
	ttmEPS: 22,
	volume: 20000,
	avgTotalVolume: 30000,
}

componentTest({
	component: <Stats />,
	mockFunctions: [mockStats],
	rejectedValues: ["Test error for stats"],
	resolvedValues: [mockData],
	testids: { error: "stats-placeholder", loading: "stats-placeholder" },
	matches: [
		`$${mockData.open}`,
		`$${mockData.high}`,
		`$${mockData.low}`,
		`$${mockData.previousClose}`,
		`$${mockData.high} - ${mockData.low}`,
		`$${mockData.week52High} - ${mockData.week52Low}`,
		`25.30 k`,
		`0.80`,
		`12.00%`,
		`$22.00`,
		`20.00 k`,
		`30.00 k`,
	],
})
