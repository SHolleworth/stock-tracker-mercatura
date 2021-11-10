import React from "react"
import NewsFeed from "."
import { millisecondTimes } from "../../utils/convertMillisecondsToNewsFeedTime"
import { componentTest } from "../componentTest"
import { requestNews } from "./services"

jest.mock("./services")

const mockNews = requestNews as jest.MockedFunction<typeof requestNews>

const mockData = [
	{
		url: "website.com",
		headline: "content test",
		timeSincePublication: Date.now() - millisecondTimes.day - 12,
		source: "source test",
	},
]

componentTest({
	component: <NewsFeed />,
	mockFunctions: [mockNews],
	rejectedValues: ["Test error for news feed"],
	resolvedValues: [mockData],
	testids: { error: "news-placeholder", loading: "news-placeholder" },
	matches: [mockData[0].headline, `1 day ago - ${mockData[0].source}`],
})
