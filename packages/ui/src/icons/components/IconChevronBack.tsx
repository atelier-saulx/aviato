import React from 'react'
import { SVGProperties } from '../types'

const SvgIconChevronBack = (properties: SVGProperties) => {
  return (
    <svg fill="none" viewBox="0 0 16 16">
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M11 2L5 8L11 14"
      />
    </svg>
  )
}

export default SvgIconChevronBack
