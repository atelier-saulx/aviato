import * as React from 'react'
import { SVGProps } from 'react'

const SvgIconSort = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 16 16" {...props}>
    <rect
      width={8}
      height={1.3}
      x={2}
      y={3}
      fill="#0F1013"
      fillOpacity={0.87}
      rx={0.65}
    />
    <rect
      width={5}
      height={1.3}
      x={2}
      y={7}
      fill="#0F1013"
      fillOpacity={0.87}
      rx={0.65}
    />
    <rect
      width={5}
      height={1.3}
      x={2}
      y={11}
      fill="#0F1013"
      fillOpacity={0.87}
      rx={0.65}
    />
    <path
      stroke="#0F1013"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.87}
      strokeWidth={1.3}
      d="M11.9167 12L14.8333 9.08333M11.9167 4.5V12V4.5ZM11.9167 12L9 9.08333L11.9167 12Z"
    />
    <path
      stroke="#0F1013"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.87}
      strokeWidth={1.3}
      d="M11.9167 12L14.8333 9.08333M11.9167 4.5V12V4.5ZM11.9167 12L9 9.08333L11.9167 12Z"
    />
  </svg>
)

export default SvgIconSort
