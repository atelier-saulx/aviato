import React from 'react'
import { SVGProperties } from '../types'

const SvgIconChevronDown = (props: SVGProperties) => {
  return (
    <svg fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M2 5L8 11L14 5"
      />
    </svg>
  )
}

export default SvgIconChevronDown
