import { concat, pipe, throwError, timer } from "rxjs"
import { map, retryWhen, switchMap } from "rxjs/operators"
import { fromFetch } from "rxjs/fetch"
import { symbolToUrl } from "./streamPricesFromSymbol"
import { SUSPENSE } from "@react-rxjs/core"
import { suspend, suspended } from "@react-rxjs/utils"

export const fetchFromSymbol = (urlGenerator: (s: string) => string) => pipe(
    symbolToUrl(urlGenerator),
    switchMap(url => fromFetch(url)),
    switchMap(response => {
        if(response.ok) {
            return response.json()
        }
        else {
            throw { error: true, status: response.status }
        }
    }),
    retryWhen(errors => 
        errors.pipe(
            map(error => {
                if(error.status === 429) {
                    return timer(100)
                }
                else return throwError(error)
            })
    )),
)