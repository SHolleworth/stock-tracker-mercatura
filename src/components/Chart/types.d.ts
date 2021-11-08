import React from 'react';
import { StatusStringType } from "../../utils/statusKeys";


export interface axisPropsType {
	tickSize: number,
	tickMargin: number,
	tickLine: { 
        stroke: string 
    },
	stroke: string,
	strokeWidth: number,
	style: React.CSSProperties,
}

export interface axisStyleType {
    fontFamily: string 
    userSelect: string
    fill: string
}

export interface price { 
	average : number
	minute: string
    date: string
}

export interface priceState {
	status: StatusStringType
	body?: price[]
}

