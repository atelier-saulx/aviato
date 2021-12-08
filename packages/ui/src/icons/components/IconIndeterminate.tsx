import * as React from 'react'
import { SVGProps } from 'react'

const SvgIconIndeterminate = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={12} height={2} x={2} y={7} fill="white" rx={1} />
  </svg>
)

export default SvgIconIndeterminate
