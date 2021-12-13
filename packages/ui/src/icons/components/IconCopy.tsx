import React from 'react'
import { SVGProperties } from '../types'

const SvgIconCopy = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M3.33337 10H2.66671C1.93033 10 1.33337 9.40308 1.33337 8.66668V2.66668C1.33337 1.9303 1.93033 1.33334 2.66671 1.33334H8.66671C9.40311 1.33334 10 1.9303 10 2.66668V3.33334"
      />
    </svg>
  )
}

export default SvgIconCopy
