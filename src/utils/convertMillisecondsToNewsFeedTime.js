import getQuotientAndRemainder from "./getQuotientAndRemainder"

const convertMillisecondsToNewsFeedTime = (milliseconds) => {
	const millisecondsSincePost = milliseconds - Date.now()
	const [yearsSincePost, yearsRemainder] = getQuotientAndRemainder(
		millisecondsSincePost,
		3.154e10
	)
	if (yearsSincePost > 0) return "Over a year"
	const [monthsSincePost, monthsRemainder] = getQuotientAndRemainder(
		yearsRemainder,
		2.628e9
	)
	if (monthsSincePost > 0) {
		if (monthsSincePost > 1) {
			return "1 month"
		}
		return `${monthsSincePost} months`
	}
	const [daysSincePost, daysRemainder] = getQuotientAndRemainder(
		monthsRemainder,
		8.64e7
	)
	if (daysSincePost > 0) {
		if (daysSincePost > 1) {
			return "1 day"
		}
		return `${daysSincePost} days`
	}
	const [hoursSincePost, hoursRemainder] = getQuotientAndRemainder(
		daysRemainder,
		3.6e6
	)
	if (hoursSincePost > 0) {
		if (hoursSincePost > 1) {
			return "1 hour"
		}
		return `${hoursSincePost} hours`
	}
	const [minutesSincePost, minutesRemainder] = getQuotientAndRemainder(
		hoursRemainder,
		60000
	)
	if (minutesSincePost > 0) {
		if (minutesSincePost > 1) {
			return "1 minute"
		}
		return `${minutesSincePost} minutes`
	}
	const secondsSincePost = minutesRemainder / 1000
	if (secondsSincePost > 0) {
		if (secondsSincePost > 1) {
			return "1 second"
		}
		return `${secondsSincePost} seconds`
	}
	return "Error"
}

export default convertMillisecondsToNewsFeedTime
