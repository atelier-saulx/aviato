import React from 'react'
import { SVGProperties } from '../types'

const SvgIconExpand = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6 3.83443C6 3.19139 6.50233 2.79074 6.90232 3.11475L11.7023 7.28032C12.0992 7.60182 12.0992 8.39818 11.7023 8.71968L6.90232 12.8852C6.50233 13.2093 6 12.8086 6 12.1656V3.83443Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default SvgIconExpand
