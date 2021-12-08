import { SUSPENSE } from "@react-rxjs/core"
import { Observable, pipe } from "rxjs"
import { startWith } from "rxjs/operators"
import { fetchAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"

export const fetchFromSymbol = <T>(urlFromSymbol: (s: string) => string) => {
    return (source: Observable<string>) => {
        return new Observable<T | typeof SUSPENSE>(subscriber => {
            return source.subscribe({
                next: async (symbol) => {
                    if(symbol === "") {
                        subscriber.complete()
                    }
                    else {
                        const info = await fetchAndCheckResponseForError(urlFromSymbol(symbol))
                        subscriber.next(info)
                    }
                },
                error: error => subscriber.error(error),
                complete: () => subscriber.complete()
            })
        })
}}

export const suspendAndFetchFromSymbol = <T>(urlFromSymbol: (s: string) => string) => pipe(fetchFromSymbol<T>(urlFromSymbol), startWith(SUSPENSE))