import React from 'react'
import { SVGProperties } from '../types'

const SvgUploadCloud = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M4.22752 4.1059C4.77663 2.49057 6.25829 1.33325 7.99992 1.33325C10.2091 1.33325 11.9999 3.19529 11.9999 5.49223C13.4727 5.49223 14.6666 6.73359 14.6666 8.26485C14.6666 9.29112 14.1303 10.1872 13.3333 10.6666M4.21371 4.13755C2.58699 4.36729 1.33325 5.81723 1.33325 7.57165C1.33325 8.70539 1.85685 9.71205 2.66635 10.3444"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.87}
        strokeWidth={1.33333}
        d="M7.99992 8V14.6667M5.33325 10.6667L7.99992 8L5.33325 10.6667ZM7.99992 8L10.6666 10.6667L7.99992 8Z"
      />
    </svg>
  )
}

export default SvgUploadCloud
