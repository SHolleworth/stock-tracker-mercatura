import getQuotientAndRemainder from "./getQuotientAndRemainder"

const convertMillisecondsToNewsFeedTime = (milliseconds) => {
	let timeString = "Error"
	const millisecondsSincePost = Date.now() - milliseconds
	const [yearsSincePost, yearsRemainder] = getQuotientAndRemainder(
		millisecondsSincePost,
		3.154e10
	)
	if (yearsSincePost > 0) timeString = "Over a year"
	const [monthsSincePost, monthsRemainder] = getQuotientAndRemainder(
		yearsRemainder,
		2.628e9
	)
	if (monthsSincePost > 0) {
		if (monthsSincePost === 1) {
			timeString = "1 month"
		} else {
			timeString = `${monthsSincePost} months`
		}
	}
	const [daysSincePost, daysRemainder] = getQuotientAndRemainder(
		monthsRemainder,
		8.64e7
	)
	if (daysSincePost > 0) {
		if (daysSincePost === 1) {
			timeString = "1 day"
		} else {
			timeString = `${daysSincePost} days`
		}
	}
	const [hoursSincePost, hoursRemainder] = getQuotientAndRemainder(
		daysRemainder,
		3.6e6
	)
	if (hoursSincePost > 0) {
		if (hoursSincePost === 1) {
			timeString = "1 hour"
		} else {
			timeString = `${hoursSincePost} hours`
		}
	}
	const [minutesSincePost, minutesRemainder] = getQuotientAndRemainder(
		hoursRemainder,
		60000
	)
	if (minutesSincePost > 0) {
		if (minutesSincePost === 1) {
			timeString = "1 minute"
		} else {
			timeString = `${minutesSincePost} minutes`
		}
	}
	const [secondsSincePost, millisecondsRemainder] = getQuotientAndRemainder(
		minutesRemainder,
		1000
	)
	if (secondsSincePost > 0) {
		if (secondsSincePost === 1) {
			timeString = "1 second"
		} else {
			timeString = `${secondsSincePost} seconds`
		}
	}
	if (millisecondsRemainder > 0) {
		return "Now"
	}

	return timeString + " ago"
}

export default convertMillisecondsToNewsFeedTime
