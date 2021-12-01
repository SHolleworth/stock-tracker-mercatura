import React, { Component, ErrorInfo } from "react"

interface Props {
	children: React.ReactNode
	fallback: React.ReactNode
}

interface State {
	hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			hasError: false,
		}
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error(error.message)
	}

	render() {
		if (!this.state.hasError) {
			return this.props.children
		}
		return this.props.fallback
	}
}
