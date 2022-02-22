import React from 'react'
import { SVGProperties } from '../types'

const SvgText = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        fillOpacity={0.87}
        d="M9.35642 14.7029C9.35642 15.2962 8.97791 15.6645 8.39479 15.6645C7.80144 15.6645 7.44338 15.2962 7.44338 14.7029V2.51872H3.28993C2.76819 2.51872 2.3999 2.18112 2.3999 1.65938C2.3999 1.13764 2.76819 0.800049 3.28993 0.800049H13.5099C14.0316 0.800049 14.3999 1.13764 14.3999 1.65938C14.3999 2.18112 14.0316 2.51872 13.5099 2.51872H9.35642V14.7029Z"
      />
    </svg>
  )
}

export default SvgText
