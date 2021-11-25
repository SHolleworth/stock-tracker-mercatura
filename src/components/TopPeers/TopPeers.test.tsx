import React from "react"
// import { render, screen, waitFor, within } from "@testing-library/react"
import TopPeers from "."
import { componentTest } from "../componentTest"
import { getPeers } from "./services"

jest.mock("./services")

const mockPeers = getPeers as jest.MockedFunction<typeof getPeers>

const mockData = ["TSLA", "AAPL", "MSFT", "AA"]

componentTest({
	component: <TopPeers />,
	mockFunctions: [mockPeers],
	rejectedValues: ["Error Loading Peers"],
	resolvedValues: [mockData],
	testids: {
		error: "peers-error-placeholder",
		loading: "peers-loading-placeholder",
	},
	matches: mockData,
})
