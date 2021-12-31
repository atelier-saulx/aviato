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
        d="M3.33325 9.99992H2.66659C1.93021 9.99992 1.33325 9.40299 1.33325 8.66659V2.66659C1.33325 1.93021 1.93021 1.33325 2.66659 1.33325H8.66659C9.40299 1.33325 9.99992 1.93021 9.99992 2.66659V3.33325"
      />
    </svg>
  )
}

export default SvgIconCopy
