const promiseWrapper = <T>(
	promise: Promise<T>,
	resolveFunction?: (arg: T) => any
) => {
	let status = "loading"
	let result: T | Error
	const suspender = promise.then(
		(resolution) => {
			status = "resolved"
			result = resolveFunction ? resolveFunction(resolution) : resolution
		},
		(error) => {
			status = "error"
			result = error
		}
	)

	return {
		read() {
			if (status === "loading") {
				throw suspender
			} else if (status === "error") {
				throw result
			} else if (status === "resolved") {
				return result
			}
		},
	}
}

export default promiseWrapper
