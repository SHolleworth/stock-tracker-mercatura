import convertMillisecondsToNewsFeedTime from "./convertMillisecondsToNewsFeedTime"

const millisecondTimes = {
	second: 1000,
	minute: 60000,
	hour: 3.6e6,
	day: 8.64e7,
	month: 2.628e9,
	year: 3.154e10,
}

it("converts to 'Now'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 110)).toBe("Now")
})

it("converts to 'second ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(Date.now() - millisecondTimes.second)
	).toBe("1 second ago")
})

it("converts to 'seconds ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 12 * millisecondTimes.second
		)
	).toBe("12 seconds ago")
})

it("converts to 'minute ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(Date.now() - millisecondTimes.minute)
	).toBe("1 minute ago")
})

it("converts to 'minutes ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 12 * millisecondTimes.minute
		)
	).toBe("12 minutes ago")
})

it("converts to 'hour ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(Date.now() - millisecondTimes.hour)
	).toBe("1 hour ago")
})

it("converts to 'hours ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 12 * millisecondTimes.hour
		)
	).toBe("12 hours ago")
})

it("converts to 'day ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(Date.now() - millisecondTimes.day)
	).toBe("1 day ago")
})

it("converts to 'days ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 12 * millisecondTimes.day
		)
	).toBe("12 days ago")
})

it("converts to 'month ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(Date.now() - millisecondTimes.month)
	).toBe("1 month ago")
})

it("converts to 'months ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 11 * millisecondTimes.month
		)
	).toBe("11 months ago")
})

it("converts to 'Over a year ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 2 * millisecondTimes.year
		)
	).toBe("Over a year ago")
})
