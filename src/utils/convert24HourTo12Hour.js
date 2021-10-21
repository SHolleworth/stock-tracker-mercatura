const convert24HourTo12Hour = (string) => {
  const hour24 = Number.parseInt(string.slice(0, 3))
  if (hour24 === 12) return string + " PM"
  const symbol = hour24 > 12 ? "PM" : "AM"
  const minuteString = string.slice(2)
  let hour12 = hour24 % 12
  let hour12String = ""
  if (hour12 < 10) {
    hour12String = "0" + hour12.toString()
  } else {
    hour12String = hour12.toString()
  }
  return `${hour12String}${minuteString} ${symbol}`
}

export default convert24HourTo12Hour
