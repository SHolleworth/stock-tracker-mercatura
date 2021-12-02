import React from "react"

export interface axisPropsType {
	tickSize: number
	tickMargin: number
	tickLine: {
		stroke: string
	}
	stroke: string
	strokeWidth: number
	style: React.CSSProperties
}

export interface axisStyleType {
	fontFamily: string
	userSelect: string
	fill: string
}

export interface Price {
	average: number
	minute: string
	date: string
}
