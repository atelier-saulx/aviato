import * as React from 'react'
import { SVGProps } from 'react'

const SvgIconMinus = (props: SVGProps<SVGSVGElement>) => {
  const { fill = 'white', fillOpacity = 1 } = props

  return (
    <svg fill="none" viewBox="0 0 16 16" {...props}>
      <rect
        width={12}
        height={2}
        x={2}
        y={7}
        fill={fill}
        fillOpacity={fillOpacity}
        rx={1}
      />
    </svg>
  )
}

export default SvgIconMinus
