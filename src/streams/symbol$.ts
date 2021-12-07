import { BehaviorSubject } from "rxjs"
import { bind } from "@react-rxjs/core"

export const symbolSubject$ = new BehaviorSubject<string>("")

const [, symbol$] = bind(symbolSubject$)

export default symbol$