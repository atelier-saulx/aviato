import React from 'react'
import { SVGProperties } from '../types'

const SvgIconDelete = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M5.33333 4.00001V2.66668C5.33333 1.9303 5.93029 1.33334 6.66667 1.33334H9.33333C10.0697 1.33334 10.6667 1.9303 10.6667 2.66668V4.00001M2 4.00001H14H2ZM3.33333 4.00001V13.3333C3.33333 14.0697 3.93029 14.6667 4.66667 14.6667H11.3333C12.0697 14.6667 12.6667 14.0697 12.6667 13.3333V4.00001H3.33333Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M9.33337 7.33334V11.3333"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M6.66663 7.33334V11.3333"
      />
    </svg>
  )
}

export default SvgIconDelete
