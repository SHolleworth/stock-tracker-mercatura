import { bind, SUSPENSE  } from "@react-rxjs/core"
import { map, withLatestFrom } from "rxjs/operators"
import { suspendAndFetchFromSymbol } from "../../streams/operators/fetchFromSymbol"
import symbol$ from "../../streams/symbol$"
import { base } from "../../utils/baseUrl"
import { KeyStatistics } from "./stats.d"
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

const FUNDAMENTALS_URL = (symbol: string) =>  `${base}stock/${symbol}/stats?${token}`
const QUOTE_URL = (symbol: string) => `${base}stock/${symbol}/quote?${token}`


const fundamentals$ = symbol$.pipe(suspendAndFetchFromSymbol<KeyStatistics>(FUNDAMENTALS_URL))
const quote$ = symbol$.pipe(suspendAndFetchFromSymbol<KeyStatistics>(QUOTE_URL))
const statistics$ = fundamentals$.pipe(
    withLatestFrom(quote$),
    map(([fundamentals, quote]) => {
        if(fundamentals !== SUSPENSE && quote !== SUSPENSE) {
            return { ...fundamentals, ...quote }
        }
    }))

const [useStatisticsStream, ] = bind(statistics$)

export default useStatisticsStream