import { useState, useEffect } from "react"

export const usePlaceholderAnimation = () => {
	const [opacity, setOpacity] = useState(1)

	useEffect(() => {
		let incrementing = false
		const intervalId = setInterval(() => {
			setOpacity((prevOpacity) => {
				console.log(prevOpacity)
				if (prevOpacity >= 1) {
					incrementing = false
				}
				if (prevOpacity <= 0) {
					incrementing = true
				}
				return incrementing ? prevOpacity + 0.01 : prevOpacity - 0.01
			})
		}, 15)
		return () => clearInterval(intervalId)
	}, [])

	return opacity
}
