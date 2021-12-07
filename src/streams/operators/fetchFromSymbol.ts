import { SUSPENSE } from "@react-rxjs/core"
import { Observable } from "rxjs"
import { fetchAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"

const fetchFromSymbol = <T>(urlFromSymbol: (s: string) => string) => {
    return (source: Observable<string>) => {
        return new Observable<T | typeof SUSPENSE>(subscriber => {
            return source.subscribe({
                next: async (symbol) => {
                    subscriber.next(SUSPENSE)
                    const info = await fetchAndCheckResponseForError(urlFromSymbol(symbol))
                    subscriber.next(info)
                },
                error: error => subscriber.error(error),
                complete: () => subscriber.complete()
            })
        })
}}

export default fetchFromSymbol