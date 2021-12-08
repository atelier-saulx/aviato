import React from 'react'
import { SVGProperties } from '../types'

const SvgIconAlignJustify = (properties: SVGProperties) => {
  return (
    <svg fill="none" viewBox="0 0 16 16">
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M14 6.66666H2"
      />
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M14 4H2"
      />
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M14 9.33334H2"
      />
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M14 12H2"
      />
    </svg>
  )
}

export default SvgIconAlignJustify
