import { abbreviateNumber } from "./utils"

describe("Numbers are being correctly abbreviated", () => {
  it("should correctly abbreviate values with Ks and Ms", () => {
    const millions = [7_082_629, 44_649_083, 118_658_996]
    const thousands = [2_629, 49_083, 658_996]

    const millionsResult = millions.map((number) => abbreviateNumber(number))
    const thousandsResult = thousands.map((number) => abbreviateNumber(number))

    const expectedMillionResult = ["7.08M", "44.65M", "118.66M"]
    const expectedThousandsResult = ["2.63K", "49.08K", "659.00K"]

    expect(millionsResult).toStrictEqual(expectedMillionResult)
    expect(thousandsResult).toStrictEqual(expectedThousandsResult)
  })
})

// 2574959298758
