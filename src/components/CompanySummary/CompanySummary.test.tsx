import React from "react"
import { componentTest } from "../componentTest"
import CompanySummary from "./CompanySummary"
import { requestCompanyInfo } from "./services"

jest.mock("./services")

const mockCompanyInfo = requestCompanyInfo as jest.MockedFunction<
	typeof requestCompanyInfo
>

const mockData = {
	symbol: "TST",
	companyName: "Name",
	website: "website.com",
	description: "description",
}

componentTest({
	component: <CompanySummary />,
	mockFunctions: [mockCompanyInfo],
	rejectedValues: ["Test error for company summary"],
	resolvedValues: [mockData],
	testids: { error: "summary-placeholder", loading: "summary-placeholder" },
	matches: ["Name (TST)", "website.com", "description..."],
})
