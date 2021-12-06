import { Subject } from "rxjs"
import { bind, shareLatest } from "@react-rxjs/core"

export const symbolSubject$ = new Subject<string>()

const [_, symbol$] = bind(symbolSubject$)

export default symbol$