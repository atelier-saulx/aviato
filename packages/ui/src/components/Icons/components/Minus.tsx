import React from 'react'
import { SVGProperties } from '../types'

const SvgMinus = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <rect
        width={12}
        height={2}
        x={2}
        y={7}
        fill="currentColor"
        fillOpacity={0.87}
        rx={1}
      />
    </svg>
  )
}

export default SvgMinus
