import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const ImageFile: FunctionComponent<SvgProps> = ({
  color,
  framed,
  size,
  frameColor,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {framed ? (
        <rect width="24" height="24" rx="4" fill={useColor(frameColor)} />
      ) : null}
      <path
        d="M16.6667 6H7.33333C6.59695 6 6 6.59695 6 7.33333V16.6667C6 17.403 6.59695 18 7.33333 18H16.6667C17.403 18 18 17.403 18 16.6667V7.33333C18 6.59695 17.403 6 16.6667 6Z"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.66602 10.667C10.2183 10.667 10.666 10.2193 10.666 9.66699C10.666 9.11471 10.2183 8.66699 9.66602 8.66699C9.11373 8.66699 8.66602 9.11471 8.66602 9.66699C8.66602 10.2193 9.11373 10.667 9.66602 10.667Z"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0007 14.0003L14.6673 10.667L7.33398 18.0003"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ImageFile
