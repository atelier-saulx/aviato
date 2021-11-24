import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const AudioFile: FunctionComponent<SvgProps> = ({
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
        d="M11.334 7.33301L8.00065 9.99968H5.33398V13.9997H8.00065L11.334 16.6663V7.33301Z"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.7127 7.28613C17.9625 8.53632 18.6646 10.2317 18.6646 11.9995C18.6646 13.7672 17.9625 15.4626 16.7127 16.7128M14.3594 9.63947C14.9843 10.2646 15.3353 11.1123 15.3353 11.9961C15.3353 12.88 14.9843 13.7277 14.3594 14.3528"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default AudioFile
