import React from "react"

function ErrorPlaceholder() {
	return (
		<div
			className={"summary-placeholder--error"}
			data-testid="summary-error-placeholder"
		>
			Error Loading Company Summary
		</div>
	)
}

export default ErrorPlaceholder
