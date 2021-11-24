import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Collapse: FunctionComponent<SvgProps> = ({
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
        d="M11.2 15.9333C11.6 16.4667 12.4 16.4667 12.8 15.9333L16.8 10.6C17.2944 9.94076 16.824 9 16 9H8C7.17595 9 6.70557 9.94076 7.2 10.6L11.2 15.9333Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Collapse
