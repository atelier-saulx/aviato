import React from 'react'
import { SVGProperties } from '../types'

const SvgChevronRight = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M5.00024 14L11.0002 8L5.00024 2"
      />
    </svg>
  )
}

export default SvgChevronRight
