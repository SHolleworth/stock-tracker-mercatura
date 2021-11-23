import React from "react"

function ErrorPlaceholder({ index }: { index: string }) {
	return (
		<div
			className="index__placeholder--error"
			data-testid="index-placeholder"
		>
			{`Error Loading ${index}`}
		</div>
	)
}

export default ErrorPlaceholder
