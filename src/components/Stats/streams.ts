import { bind  } from "@react-rxjs/core"
import { suspended } from "@react-rxjs/utils"
import { zip } from "rxjs"
import { map, tap } from "rxjs/operators"
import { fetchFromSymbol } from "../../streams/operators/fetchFromSymbol"
import symbol$ from "../../streams/symbol$"
import { base } from "../../utils/baseUrl"
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

const FUNDAMENTALS_URL = (symbol: string) =>  `${base}stock/${symbol}/stats?${token}`
const QUOTE_URL = (symbol: string) => `${base}stock/${symbol}/quote?${token}`


const fundamentals$ = symbol$.pipe(
    fetchFromSymbol(FUNDAMENTALS_URL),
)

const quote$ = symbol$.pipe(
    fetchFromSymbol(QUOTE_URL),
 )

const [useStatisticsStream, ] = bind(zip(fundamentals$, quote$).pipe(
    tap(([fundamentals, quote]) => {
        console.log("Fundamentals: ")
        console.log(fundamentals)
        console.log("Quote: ")
        console.log(quote)
    }),
    map(([fundamentals, quote]) => ({ ...fundamentals, ...quote })),
    suspended()
))

export default useStatisticsStream