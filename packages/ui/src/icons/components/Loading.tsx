import React from 'react'
import { SVGProperties } from '../types'

const SvgLoading = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M7.99992 11.9999V14.6666M10.6666 10.6666L12.6666 12.6666L10.6666 10.6666ZM11.9999 7.99992H14.6666H11.9999ZM5.33325 5.33325L3.33325 3.33325L5.33325 5.33325ZM10.6666 5.33325L12.6666 3.33325L10.6666 5.33325ZM5.33325 10.6666L3.33325 12.6666L5.33325 10.6666ZM1.33325 7.99992H3.99992H1.33325ZM7.99992 1.33325V3.99992V1.33325Z"
      />
    </svg>
  )
}

export default SvgLoading
