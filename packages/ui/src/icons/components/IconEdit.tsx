import React from 'react'
import { SVGProperties } from '../types'

const SvgIconEdit = (properties: SVGProperties) => {
  return (
    <svg fill="none" viewBox="0 0 16 16">
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M7.33337 2.66669H2.66671C2.31309 2.66669 1.97395 2.80716 1.7239 3.05721C1.47385 3.30726 1.33337 3.6464 1.33337 4.00002V13.3334C1.33337 13.687 1.47385 14.0261 1.7239 14.2762C1.97395 14.5262 2.31309 14.6667 2.66671 14.6667H12C12.3537 14.6667 12.6928 14.5262 12.9428 14.2762C13.1929 14.0261 13.3334 13.687 13.3334 13.3334V8.66669"
      />
      <path
        stroke={properties.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.33333}
        d="M12.3334 1.66665C12.5986 1.40144 12.9583 1.25244 13.3334 1.25244C13.7084 1.25244 14.0682 1.40144 14.3334 1.66665C14.5986 1.93187 14.7476 2.29158 14.7476 2.66665C14.7476 3.04173 14.5986 3.40144 14.3334 3.66665L8.00004 9.99999L5.33337 10.6667L6.00004 7.99999L12.3334 1.66665Z"
      />
    </svg>
  )
}

export default SvgIconEdit
