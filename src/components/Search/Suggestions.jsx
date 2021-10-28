import React from "react"
import "./styles.css"

const Suggestions = ({ suggestions }) => {
  return (
    <div className="suggestions">
      <ul className="suggestions__list">
        <div className="suggestions__title">Stock</div>
        {suggestions?.map((suggestion, i) => (
          <li key={i} className="suggestions__stock">
            {suggestion.symbol} - {suggestion.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Suggestions
