const convert24HourTo12Hour = (timeString : string) => {
	const cleanTimeString = removePrependedIndex(timeString)
	if (
		typeof cleanTimeString !== "string" ||
		!cleanTimeString.match(/(\d?\d:\d\d){1}/)
	) {
		throw new Error(
			"cleanTimeString must be a string in the format m:hh or mm:hh"
		)
	} else {
		const hour24 = Number.parseInt(cleanTimeString.slice(0, -2))
		if (hour24 === 12) return cleanTimeString + " PM"
		const symbol = hour24 > 12 ? "PM" : "AM"
		const minuteString = cleanTimeString.slice(-2)
		let hour12 = hour24 % 12
		return `${hour12}:${minuteString} ${symbol}`
	}
}

const removePrependedIndex = (stringWithIndex : string) => {
	if (typeof stringWithIndex === "string") {
		const spaceIndex = stringWithIndex.indexOf(" ")
		return stringWithIndex.slice(spaceIndex + 1)
	}
	return stringWithIndex
}

export default convert24HourTo12Hour
