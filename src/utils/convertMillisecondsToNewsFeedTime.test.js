import convertMillisecondsToNewsFeedTime from "./convertMillisecondsToNewsFeedTime"

it("converts to 'Now'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 110)).toBe("Now")
})

it("converts to 'second ago'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 1000)).toBe(
		"1 second ago"
	)
})

it("converts to 'seconds ago'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 12000)).toBe(
		"12 seconds ago"
	)
})

it("converts to 'minute ago'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 60000)).toBe(
		"1 minute ago"
	)
})

it("converts to 'minutes ago'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 12 * 60000)).toBe(
		"12 minutes ago"
	)
})

it("converts to 'hour ago'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 3.6e6)).toBe(
		"1 hour ago"
	)
})

it("converts to 'hours ago'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 12 * 3.6e6)).toBe(
		"12 hours ago"
	)
})

it("converts to 'day ago'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 8.64e7)).toBe(
		"1 day ago"
	)
})

it("converts to 'days ago'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 12 * 8.64e7)).toBe(
		"12 days ago"
	)
})

it("converts to 'month ago'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 2.628e9)).toBe(
		"1 month ago"
	)
})

it("converts to 'months ago'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 11 * 2.628e9)).toBe(
		"11 months ago"
	)
})

it("converts to 'Over a year ago'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 2 * 3.154e10)).toBe(
		"Over a year ago"
	)
})
