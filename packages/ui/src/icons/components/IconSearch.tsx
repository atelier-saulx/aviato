import React from 'react'
import { SVGProperties } from '../types'

const SvgIconSearch = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M11.3334 11.3333L14.6667 14.6667L11.3334 11.3333ZM13 7.16668C13 10.3883 10.3884 13 7.16671 13C3.94505 13 1.33337 10.3883 1.33337 7.16668C1.33337 3.94502 3.94505 1.33334 7.16671 1.33334C10.3884 1.33334 13 3.94502 13 7.16668Z"
      />
    </svg>
  )
}

export default SvgIconSearch
