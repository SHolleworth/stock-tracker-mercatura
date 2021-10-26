import convert24HourTo12Hour from "./convert24HourTo12Hour"

it("converted PM time correctly", () => {
	expect(convert24HourTo12Hour("13:00")).toBe("1:00 PM")
})

it("converted AM time correctly", () => {
	expect(convert24HourTo12Hour("09:00")).toBe("9:00 AM")
})

it("converts time without a leading 0", () => {
	expect(convert24HourTo12Hour("9:00")).toBe("9:00 AM")
})

it("throws an error when not passed a string", () => {
	expect(() => {
		convert24HourTo12Hour(13)
	}).toThrow(
		new Error(
			"cleanTimeString must be a string in the format m:hh or mm:hh"
		)
	)
})

it("throws an error when passed an incorrect string", () => {
	expect(() => {
		convert24HourTo12Hour("1111111")
	}).toThrowError(
		new Error(
			"cleanTimeString must be a string in the format m:hh or mm:hh"
		)
	)
})
