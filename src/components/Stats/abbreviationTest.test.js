import { abbreviateNumber } from "./utils"

describe("Numbers are being correctly abbreviated", () => {
	it("should correctly abbreviate values with Ks and Ms", () => {
		const millions = [7_082_629, 44_649_083, 118_658_996]
		const thousands = [2_629, 49_083, 658_996]

		const millionsResult = millions.map((number) =>
			abbreviateNumber(number)
		)
		const thousandsResult = thousands.map((number) =>
			abbreviateNumber(number)
		)

		const expectedMillionResult = ["7.08 M", "44.65 M", "118.66 M"]
		const expectedThousandsResult = ["2.63 k", "49.08 k", "659.00 k"]

		expect(millionsResult).toStrictEqual(expectedMillionResult)
		expect(thousandsResult).toStrictEqual(expectedThousandsResult)
	})
})
