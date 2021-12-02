import React from "react"
import STATUS from "../../utils/statusKeys"
import { componentTest } from "../componentTest"
import useLivePrice, { PriceState } from "../LivePrice/hooks/useLivePrice"
import { Index } from "./Indices"
// import Indices from "./Indices"

jest.mock("../LivePrice/hooks/useLivePrice")

const mockPrice = useLivePrice as jest.MockedFunction<typeof useLivePrice>

const mockResolvedData: PriceState = {
	status: STATUS.RESOLVED,
	body: {
		change: 2,
		latestPrice: 200,
		changePercent: 0.1,
	},
}

const mockRejectedData: PriceState = {
	status: STATUS.ERROR,
	body: {
		change: 2,
		latestPrice: 200,
		changePercent: 0.1,
	},
}

componentTest({
	component: <Index symbol="DIA" className="index-price" />,
	mockFunctions: [mockPrice],
	returnedValues: {
		resolved: mockResolvedData,
		error: mockRejectedData,
		loading: { status: STATUS.LOADING },
	},
	testids: {
		error: "index-error-placeholder",
		loading: "index-loading-placeholder",
	},
	matches: [
		`DIA`,
		`$${mockResolvedData.body?.latestPrice.toFixed(2)}`,
		`${mockResolvedData.body?.change.toFixed(
			2
		)} | ${mockResolvedData.body?.changePercent.toFixed(2)}%`,
	],
})
