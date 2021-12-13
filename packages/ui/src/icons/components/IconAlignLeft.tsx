import React from 'react'
import { SVGProperties } from '../types'

const SvgIconAlignLeft = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M11.3333 6.66666H2"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M14 4H2"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M14 9.33334H2"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M11.3333 12H2"
      />
    </svg>
  )
}

export default SvgIconAlignLeft
