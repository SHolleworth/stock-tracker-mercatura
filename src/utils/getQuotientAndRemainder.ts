const getQuotientAndRemainder = (dividend : number, divisor : number) => {
	const quotient = Math.floor(dividend / divisor)
	const remainder = dividend % divisor
	return [quotient, remainder]
}

export default getQuotientAndRemainder
