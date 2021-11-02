import getQuotientAndRemainder from "./getQuotientAndRemainder"

export const millisecondTimes = {
	second: 1000,
	minute: 60000,
	hour: 3.6e6,
	day: 8.64e7,
	month: 2.628e9,
	year: 3.154e10,
}

const convertMillisecondsToNewsFeedTime = (milliseconds) => {
	let timeString = "Error"
	const millisecondsSincePost = Date.now() - milliseconds
	const [yearsSincePost, yearsRemainder] = getQuotientAndRemainder(
		millisecondsSincePost,
		millisecondTimes.year
	)
	if (yearsSincePost > 0) timeString = "Over a year"
	const [monthsSincePost, monthsRemainder] = getQuotientAndRemainder(
		yearsRemainder,
		millisecondTimes.month
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
		millisecondTimes.day
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
		millisecondTimes.hour
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
		millisecondTimes.minute
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
		millisecondTimes.second
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
