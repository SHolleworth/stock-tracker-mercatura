export const useScroll = (ref) => {
	let pos = { left: 0, x: 0 }
	const startScroll = (e) => {
		pos = { left: ref.current.scrollLeft, x: e.clientX }

		document.addEventListener("mousemove", handleScroll)
		document.addEventListener("mouseup", endScroll)
	}

	const handleScroll = (e) => {
		const dx = e.clientX - pos.x
		ref.current.scrollLeft = pos.left - dx
	}

	const endScroll = (e) => {
		document.removeEventListener("mousemove", handleScroll)
		document.removeEventListener("mouseup", endScroll)
	}

	return { startScroll }
}
