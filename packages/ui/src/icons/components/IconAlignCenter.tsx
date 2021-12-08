import React from 'react'
import { SVGProperties } from '../types'

const SvgIconAlignCenter = (props: SVGProperties) => {
  return (
    <svg fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M12 6.66666H4"
      />
      <path
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M14 4H2"
      />
      <path
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M14 9.33334H2"
      />
      <path
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M12 12H4"
      />
    </svg>
  )
}

export default SvgIconAlignCenter
