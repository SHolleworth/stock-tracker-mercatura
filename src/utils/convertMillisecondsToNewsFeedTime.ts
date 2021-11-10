import getQuotientAndRemainder from "./getQuotientAndRemainder"

export const millisecondTimes = {
	second: 1000,
	minute: 60000,
	hour: 3.6e6,
	day: 8.64e7,
	month: 2.628e9,
	year: 3.154e10,
}

const convertMillisecondsToNewsFeedTime = (milliseconds: number) => {
	const millisecondsSincePost = Date.now() - milliseconds
	const [yearsSincePost, yearsRemainder] = getQuotientAndRemainder(
		millisecondsSincePost,
		millisecondTimes.year
	)
	if (yearsSincePost > 0) return "Over a year ago"
	const [monthsSincePost, monthsRemainder] = getQuotientAndRemainder(
		yearsRemainder,
		millisecondTimes.month
	)
	if (monthsSincePost > 0) {
		if (monthsSincePost === 1) {
			return "1 month ago"
		} else {
			return `${monthsSincePost} months ago`
		}
	}
	const [daysSincePost, daysRemainder] = getQuotientAndRemainder(
		monthsRemainder,
		millisecondTimes.day
	)
	if (daysSincePost > 0) {
		if (daysSincePost === 1) {
			return "1 day ago"
		} else {
			return `${daysSincePost} days ago`
		}
	}
	const [hoursSincePost, hoursRemainder] = getQuotientAndRemainder(
		daysRemainder,
		millisecondTimes.hour
	)
	if (hoursSincePost > 0) {
		if (hoursSincePost === 1) {
			return "1 hour ago"
		} else {
			return `${hoursSincePost} hours ago`
		}
	}
	const [minutesSincePost, minutesRemainder] = getQuotientAndRemainder(
		hoursRemainder,
		millisecondTimes.minute
	)
	if (minutesSincePost > 0) {
		if (minutesSincePost === 1) {
			return "1 minute ago"
		} else {
			return `${minutesSincePost} minutes ago`
		}
	}
	const [secondsSincePost, millisecondsRemainder] = getQuotientAndRemainder(
		minutesRemainder,
		millisecondTimes.second
	)
	if (secondsSincePost > 0) {
		if (secondsSincePost === 1) {
			return "1 second ago"
		} else {
			return `${secondsSincePost} seconds ago`
		}
	}
	if (millisecondsRemainder > 0) {
		return "Now"
	}

	return "Error"
}

export default convertMillisecondsToNewsFeedTime
