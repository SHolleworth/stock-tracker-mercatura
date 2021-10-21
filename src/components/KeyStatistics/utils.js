export const addDollarSign = (str) => {
  return "$" + str
}

export const abbreviateNumber = (numberToAbbreviate) => {
  const strNumber = numberToAbbreviate.toString()
  if (strNumber.length <= 3) {
    return strNumber
  }

  const suffixes = ["", "K", "M", "B", "T"]
  const suffixToShow = Math.floor(numberToAbbreviate.toString().length / 3)
  const exponent =
    Math.floor(numberToAbbreviate.toString().length % 3) === 0
      ? suffixToShow - 1
      : suffixToShow
  const floatNumber = Math.floor(numberToAbbreviate) / Math.pow(1000, exponent)

  const index =
    numberToAbbreviate.toString().length % 3 === 0
      ? suffixToShow - 1
      : suffixToShow

  const result = floatNumber.toFixed(2) + suffixes[index]

  return result
}
