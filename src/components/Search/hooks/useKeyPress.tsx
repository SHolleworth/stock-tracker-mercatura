import { useState, useEffect } from "react"

const useKeyPress = (targetKey: string): boolean => {
	const [keyPressed, setKeyPressed] = useState(false)

	function downHandler({ key }: { key: string }) {
		if (key === targetKey) {
			setKeyPressed(true)
		}
	}

	function upHandler({ key }: { key: string }) {
		if (key === targetKey) {
			setKeyPressed(false)
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", downHandler)
		window.addEventListener("keydown", upHandler)

		return () => {
			window.removeEventListener("keydown", downHandler)
			window.removeEventListener("keydown", upHandler)
		}
	})
	return keyPressed
}

export default useKeyPress
