import React, { createContext, useContext, useState } from "react"

const RenderFlagContext = createContext(0)

export const useRenderFlag = () => {
	return useContext(RenderFlagContext)
}

const RenderFlagContextProvider = ({ children }) => {
	const [renderFlag, setRenderFlag] = useState(0)

	return (
		<RenderFlagContext.Provider value={{ renderFlag, setRenderFlag }}>
			{children}
		</RenderFlagContext.Provider>
	)
}

export default RenderFlagContextProvider
