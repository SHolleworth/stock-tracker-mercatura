import React, { createContext, useContext, useEffect, useState } from "react"

type RenderFlagContextType = {
	renderFlag: number;
	setRenderFlag: React.Dispatch<React.SetStateAction<number>>;
}

const RenderFlagContext = createContext<RenderFlagContextType>({ renderFlag: 0, setRenderFlag: () => {}})

export const useRenderFlag = () => {
	return useContext(RenderFlagContext)
}

const RenderFlagContextProvider : React.FC = ({ children }) => {
	const [renderFlag, setRenderFlag] = useState(-1)

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
	chart: 2,
	summary: 1,
	livePrice: 2,
	newsFeed: 3,
	search: 4,
	stats: 5,
	topPeers: 6,
}
