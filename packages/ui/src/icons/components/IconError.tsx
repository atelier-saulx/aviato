import React from 'react'
import { SVGProperties } from '../types'

const SvgIconError = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        fillOpacity={0.87}
        d="M8.78873 8.78873V3.98122H7.21127V8.78873H8.78873ZM8.78873 12.0188V10.4038H7.21127V12.0188H8.78873ZM2.32864 2.3662C3.9061 0.788732 5.79656 0 8 0C10.2034 0 12.0814 0.788732 13.6338 2.3662C15.2113 3.91862 16 5.79656 16 8C16 10.2034 15.2113 12.0939 13.6338 13.6714C12.0814 15.2238 10.2034 16 8 16C5.79656 16 3.9061 15.2238 2.32864 13.6714C0.776213 12.0939 0 10.2034 0 8C0 5.79656 0.776213 3.91862 2.32864 2.3662Z"
      />
    </svg>
  )
}

export default SvgIconError
