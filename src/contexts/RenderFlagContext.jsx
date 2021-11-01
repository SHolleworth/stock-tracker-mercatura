import React, { createContext, useContext, useEffect, useState } from "react"

const RenderFlagContext = createContext(0)

export const useRenderFlag = () => {
	return useContext(RenderFlagContext)
}

const RenderFlagContextProvider = ({ children }) => {
	const [renderFlag, setRenderFlag] = useState(0)

	useEffect(() => {
		console.log(renderFlag)
	}, [renderFlag])

	return (
		<RenderFlagContext.Provider value={{ renderFlag, setRenderFlag }}>
			{children}
		</RenderFlagContext.Provider>
	)
}

export default RenderFlagContextProvider

export const FLAGS = {
	chart: 0,
	summary: 1,
	livePrice: 2,
	newsFeed: 3,
	search: 4,
	stats: 5,
	topPeers: 6,
}
