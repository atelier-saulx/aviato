import React from 'react'
import { SVGProperties } from '../types'

const SvgIconTarget = (properties: SVGProperties) => {
  return (
    <svg fill="none" viewBox="0 0 16 16">
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M8.00004 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31811 11.6819 1.33334 8.00004 1.33334C4.31814 1.33334 1.33337 4.31811 1.33337 8.00001C1.33337 11.6819 4.31814 14.6667 8.00004 14.6667Z"
      />
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
      />
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M7.99996 9.33332C8.73634 9.33332 9.33329 8.73637 9.33329 7.99999C9.33329 7.26361 8.73634 6.66666 7.99996 6.66666C7.26358 6.66666 6.66663 7.26361 6.66663 7.99999C6.66663 8.73637 7.26358 9.33332 7.99996 9.33332Z"
      />
    </svg>
  )
}

export default SvgIconTarget
