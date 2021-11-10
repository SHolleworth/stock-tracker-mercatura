import convertMillisecondsToNewsFeedTime from "./convertMillisecondsToNewsFeedTime"
import { millisecondTimes } from "./convertMillisecondsToNewsFeedTime"

it("converts to 'Now'", () => {
	expect(convertMillisecondsToNewsFeedTime(Date.now() - 110)).toBe("Now")
})

it("converts to 'second ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - millisecondTimes.second - 5
		)
	).toBe("1 second ago")
})

it("converts to 'seconds ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 12 * millisecondTimes.second - 5
		)
	).toBe("12 seconds ago")
})

it("converts to 'minute ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - millisecondTimes.minute - 5
		)
	).toBe("1 minute ago")
})

it("converts to 'minutes ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 12 * millisecondTimes.minute - 5
		)
	).toBe("12 minutes ago")
})

it("converts to 'minutes ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 59 * millisecondTimes.minute - 5
		)
	).toBe("59 minutes ago")
})

it("converts to 'hour ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - millisecondTimes.hour - 5
		)
	).toBe("1 hour ago")
})

it("converts to 'hours ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 12 * millisecondTimes.hour - 5
		)
	).toBe("12 hours ago")
})

it("converts to 'day ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(Date.now() - millisecondTimes.day - 5)
	).toBe("1 day ago")
})

it("converts to 'days ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 12 * millisecondTimes.day - 5
		)
	).toBe("12 days ago")
})

it("converts to 'month ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - millisecondTimes.month - 5
		)
	).toBe("1 month ago")
})

it("converts to 'months ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 11 * millisecondTimes.month - 5
		)
	).toBe("11 months ago")
})

it("converts to 'Over a year ago'", () => {
	expect(
		convertMillisecondsToNewsFeedTime(
			Date.now() - 2 * millisecondTimes.year - 5
		)
	).toBe("Over a year ago")
})
