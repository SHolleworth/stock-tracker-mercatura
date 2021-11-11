import React, { useState, createContext, useContext } from "react"

interface FocusedContextType {
	focused: boolean
	setFocused: (focused: boolean) => void
}

const FocusContext = createContext<FocusedContextType>({
	focused: false,
	setFocused: () => {},
})

export const useFocus = () => {
	return useContext(FocusContext)
}

const FocusContextProvider: React.FC = ({ children }) => {
	const [focused, setFocused] = useState(false)

	return (
		<FocusContext.Provider value={{ focused, setFocused }}>
			{children}
		</FocusContext.Provider>
	)
}

export default FocusContextProvider
