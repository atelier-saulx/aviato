import * as React from 'react'
import { SVGProps } from 'react'

const SvgIconPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 16 16" {...props}>
    <path
      fill="#0F1013"
      fillOpacity={0.87}
      fillRule="evenodd"
      d="M8 2C7.44772 2 7 2.44772 7 3V7H3C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9H7V13C7 13.5523 7.44772 14 8 14C8.55228 14 9 13.5523 9 13V9H13C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7H9V3C9 2.44772 8.55228 2 8 2Z"
      clipRule="evenodd"
    />
  </svg>
)

export default SvgIconPlus
