import React from 'react'
import { SVGProperties } from '../types'

const SvgLayers = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M7.99992 1.33325L1.33325 4.66659L7.99992 7.99992L14.6666 4.66659L7.99992 1.33325Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M1.33325 11.3333L7.99992 14.6666L14.6666 11.3333"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M1.33325 8L7.99992 11.3333L14.6666 8"
      />
    </svg>
  )
}

export default SvgLayers
