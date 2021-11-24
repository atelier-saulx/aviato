import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const DownThick: FunctionComponent<SvgProps> = ({
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
        d="M11.4541 16.7284L5.22477 10.1429C5.07492 9.98444 5 9.79208 5 9.56577C5 9.33946 5.07492 9.1471 5.22477 8.98868L5.93119 8.24187C6.08104 8.08345 6.263 8.00424 6.47706 8.00424C6.69113 7.98161 6.87309 8.0495 7.02294 8.20792L12 13.4696L16.9771 8.20792C17.1269 8.0495 17.3089 7.98161 17.5229 8.00424C17.737 8.00424 17.919 8.08345 18.0688 8.24187L18.7752 8.98868C18.9251 9.1471 19 9.33946 19 9.56577C19 9.79208 18.9251 9.98444 18.7752 10.1429L12.5459 16.7284C12.396 16.9095 12.2141 17 12 17C11.7859 17 11.604 16.9095 11.4541 16.7284Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default DownThick
