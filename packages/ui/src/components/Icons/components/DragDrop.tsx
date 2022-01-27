import React from 'react'
import { SVGProperties } from '../types'

const SvgDragDrop = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        fillOpacity={0.87}
        fillRule="evenodd"
        d="M9 8C9 7.17157 9.67157 6.5 10.5 6.5C11.3284 6.5 12 7.17157 12 8C12 8.82843 11.3284 9.5 10.5 9.5C9.67157 9.5 9 8.82843 9 8ZM9 12.5C9 11.6716 9.67157 11 10.5 11C11.3284 11 12 11.6716 12 12.5C12 13.3284 11.3284 14 10.5 14C9.67157 14 9 13.3284 9 12.5ZM9 3.5C9 2.67157 9.67157 2 10.5 2C11.3284 2 12 2.67157 12 3.5C12 4.32843 11.3284 5 10.5 5C9.67157 5 9 4.32843 9 3.5Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillOpacity={0.87}
        fillRule="evenodd"
        d="M4 8C4 7.17157 4.67157 6.5 5.5 6.5C6.32843 6.5 7 7.17157 7 8C7 8.82843 6.32843 9.5 5.5 9.5C4.67157 9.5 4 8.82843 4 8ZM4 12.5C4 11.6716 4.67157 11 5.5 11C6.32843 11 7 11.6716 7 12.5C7 13.3284 6.32843 14 5.5 14C4.67157 14 4 13.3284 4 12.5ZM4 3.5C4 2.67157 4.67157 2 5.5 2C6.32843 2 7 2.67157 7 3.5C7 4.32843 6.32843 5 5.5 5C4.67157 5 4 4.32843 4 3.5Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default SvgDragDrop
