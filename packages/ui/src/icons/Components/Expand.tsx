import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Expand: FunctionComponent<SvgProps> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9333 12.8C15.4667 12.4 15.4667 11.6 14.9333 11.2L9.6 7.2C8.94076 6.70557 8 7.17596 8 8L8 16C8 16.824 8.94076 17.2944 9.6 16.8L14.9333 12.8Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Expand
