import React from 'react'
import { SVGProperties } from '../types'

const SvgEdit = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M7.33325 2.66675H2.66659C2.31296 2.66675 1.97382 2.80722 1.72378 3.05727C1.47373 3.30732 1.33325 3.64646 1.33325 4.00008V13.3334C1.33325 13.687 1.47373 14.0262 1.72378 14.2762C1.97382 14.5263 2.31296 14.6667 2.66659 14.6667H11.9999C12.3535 14.6667 12.6927 14.5263 12.9427 14.2762C13.1928 14.0262 13.3333 13.687 13.3333 13.3334V8.66675"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M12.3333 1.66665C12.5985 1.40144 12.9582 1.25244 13.3333 1.25244C13.7083 1.25244 14.068 1.40144 14.3333 1.66665C14.5985 1.93187 14.7475 2.29158 14.7475 2.66665C14.7475 3.04173 14.5985 3.40144 14.3333 3.66665L7.99992 9.99999L5.33325 10.6667L5.99992 7.99999L12.3333 1.66665Z"
      />
    </svg>
  )
}

export default SvgEdit
