import React from 'react'
import { SVGProperties } from '../types'

const SvgIconMore = (properties: SVGProperties) => {
  return (
    <svg fill="none" viewBox="0 0 16 16">
      <path
        fill={properties.fill}
        fillRule="evenodd"
        d="M8 6C8.82843 6 9.5 6.67157 9.5 7.5C9.5 8.32843 8.82843 9 8 9C7.17157 9 6.5 8.32843 6.5 7.5C6.5 6.67157 7.17157 6 8 6ZM3.5 6C4.32843 6 5 6.67157 5 7.5C5 8.32843 4.32843 9 3.5 9C2.67157 9 2 8.32843 2 7.5C2 6.67157 2.67157 6 3.5 6ZM12.5 6C13.3284 6 14 6.67157 14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default SvgIconMore
