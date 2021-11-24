import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Up: FunctionComponent<SvgProps> = ({
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
        d="M12.5459 7.27157L18.7752 13.8571C18.9251 14.0156 19 14.2079 19 14.4342C19 14.6605 18.9251 14.8529 18.7752 15.0113L18.0688 15.7581C17.919 15.9165 17.737 15.9958 17.5229 15.9958C17.3089 16.0184 17.1269 15.9505 16.9771 15.7921L12 10.5304L7.02294 15.7921C6.87309 15.9505 6.69113 16.0184 6.47706 15.9958C6.263 15.9958 6.08104 15.9165 5.93119 15.7581L5.22477 15.0113C5.07492 14.8529 5 14.6605 5 14.4342C5 14.2079 5.07492 14.0156 5.22477 13.8571L11.4541 7.27157C11.604 7.09052 11.7859 7 12 7C12.2141 7 12.396 7.09052 12.5459 7.27157Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Up
