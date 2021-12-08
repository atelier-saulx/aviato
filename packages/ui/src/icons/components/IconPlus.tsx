import * as React from 'react'
import { SVGProps } from 'react'

const SvgIconPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M8 2a1 1 0 0 0-1 1v4H3a1 1 0 0 0 0 2h4v4a1 1 0 1 0 2 0V9h4a1 1 0 1 0 0-2H9V3a1 1 0 0 0-1-1Z"
      clipRule="evenodd"
    />
  </svg>
)

export default SvgIconPlus
