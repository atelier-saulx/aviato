import React from 'react'
import { SVGProperties } from '../types'

const SvgIconLoading = (props: SVGProperties) => {
  return (
    <svg fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M8.00004 12V14.6667M10.6667 10.6667L12.6667 12.6667L10.6667 10.6667ZM12 8.00001H14.6667H12ZM5.33337 5.33334L3.33337 3.33334L5.33337 5.33334ZM10.6667 5.33334L12.6667 3.33334L10.6667 5.33334ZM5.33337 10.6667L3.33337 12.6667L5.33337 10.6667ZM1.33337 8.00001H4.00004H1.33337ZM8.00004 1.33334V4.00001V1.33334Z"
      />
    </svg>
  )
}

export default SvgIconLoading
