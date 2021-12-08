import * as React from 'react'
import { SVGProps } from 'react'

const SvgIconCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.433 7.872 2.78 6.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.12-.067l5.25-6a.75.75 0 0 0-1.18-.926L4.433 7.872Z"
      fill="#fff"
    />
  </svg>
)

export default SvgIconCheck
