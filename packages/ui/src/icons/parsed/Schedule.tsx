import React from 'react'
import { SVGProperties } from '../../types'

const SvgSchedule = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M6 2H2V4.66667H6V2Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M7.33333 11.3333H2V13.9999H7.33333V11.3333Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M14.0001 6.66675H4.66675V9.33341H14.0001V6.66675Z"
      />
    </svg>
  )
}

export default SvgSchedule
