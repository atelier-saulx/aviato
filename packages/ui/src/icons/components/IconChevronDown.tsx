import * as React from 'react'
import { SVGProps } from 'react'

const SvgIconChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 16 16" {...props}>
    <path
      stroke="#0F1013"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.87}
      strokeWidth={1.33333}
      d="M2 5L8 11L14 5"
    />
  </svg>
)

export default SvgIconChevronDown
