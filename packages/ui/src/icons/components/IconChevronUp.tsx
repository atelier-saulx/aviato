import React from 'react'
import { SVGProperties } from '../types'

const SvgIconChevronUp = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M14 11L8 5L2 11"
      />
    </svg>
  )
}

export default SvgIconChevronUp
