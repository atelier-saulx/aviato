import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const VideoFile: FunctionComponent<SvgProps> = ({
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
        d="M17.214 5.33301H6.78732C5.98466 5.33301 5.33398 5.98369 5.33398 6.78634V17.213C5.33398 18.0157 5.98466 18.6663 6.78732 18.6663H17.214C18.0166 18.6663 18.6673 18.0157 18.6673 17.213V6.78634C18.6673 5.98369 18.0166 5.33301 17.214 5.33301Z"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66602 5.33301V18.6663"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.334 5.33301V18.6663"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33398 12H18.6673"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33398 8.66699H8.66732"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33398 15.333H8.66732"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.334 15.333H18.6673"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.334 8.66699H18.6673"
        stroke={useColor(color)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default VideoFile
