import React from 'react'
import { SVGProperties } from '../types'

const SvgIconSchedule = (properties: SVGProperties) => {
  return (
    <svg fill="none" viewBox="0 0 16 16">
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M6 2H2V4.66667H6V2Z"
      />
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M7.33333 11.3333H2V14H7.33333V11.3333Z"
      />
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M14 6.66666H4.66663V9.33332H14V6.66666Z"
      />
    </svg>
  )
}

export default SvgIconSchedule
