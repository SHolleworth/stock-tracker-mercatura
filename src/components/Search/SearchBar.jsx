import React, { useState } from "react"
import useSearch from "./hooks/useSearch"
import "./styles.css"

const SearchBar = ({ onFocus, onBlur }) => {
  const [value, setValue] = useState("")
  const suggestions = useSearch(value)

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  console.log(suggestions)

  return (
    <div className="field">
      <input
        type="text"
        id="search"
        value={value}
        placeholder="Enter a stock, symbol or currency"
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

export default SearchBar
