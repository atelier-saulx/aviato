import React from 'react'
import { SVGProperties } from '../types'

const SvgMarkdown = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        fillOpacity={0.87}
        d="M0 12V4H2.06452L4.12903 6.94118L6.19355 4H8.25806V12H6.19355V7.41176L4.12903 10.3529L2.06452 7.41176V12H0ZM12.9032 12L9.80645 8.11765H11.871V4H13.9355V8.11765H16L12.9032 12Z"
      />
    </svg>
  )
}

export default SvgMarkdown
