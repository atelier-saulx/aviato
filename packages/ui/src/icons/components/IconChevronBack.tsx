import React from 'react'
import { SVGProperties } from '../types'

const SvgIconChevronBack = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M11 2L5 8L11 14"
      />
    </svg>
  )
}

export default SvgIconChevronBack
