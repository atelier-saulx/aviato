import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const UpTriangle: FunctionComponent<SvgProps> = ({
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
        d="M12.8 8.06667C12.4 7.53333 11.6 7.53333 11.2 8.06667L7.2 13.4C6.70557 14.0592 7.17595 15 8 15L16 15C16.824 15 17.2944 14.0592 16.8 13.4L12.8 8.06667Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default UpTriangle
