import React from 'react'
import { SVGProperties } from '../types'

function SvgIconMinus(properties: SVGProperties) {
  return (
    <svg fill="none" viewBox="0 0 16 16">
      <rect width={12} height={2} x={2} y={7} fill={properties.fill} rx={1} />
    </svg>
  )
}

export default SvgIconMinus
