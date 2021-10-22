const convert24HourTo12Hour = (timeString) => {
  if (typeof timeString !== "string" || !timeString.match(/(\d?\d:\d\d){1}/)) {
    throw new Error("timeString must be a string in the format m:hh or mm:hh")
  } else {
    const hour24 = Number.parseInt(timeString.slice(0, -2))
    if (hour24 === 12) return timeString + " PM"
    const symbol = hour24 > 12 ? "PM" : "AM"
    const minuteString = timeString.slice(-2)
    let hour12 = hour24 % 12
    return `${hour12}:${minuteString} ${symbol}`
  }
}

export default convert24HourTo12Hour
