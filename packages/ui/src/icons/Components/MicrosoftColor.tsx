import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const MicrosoftColor: FunctionComponent<SvgProps> = ({
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
      <path d="M3 3H11.5588V11.559H3V3Z" fill="#E95228" />
      <path d="M12.4414 3H21.0002V11.559H12.4414V3Z" fill="#7EBA28" />
      <path d="M3 12.457H11.5588V20.9997H3V12.457Z" fill="#339FDA" />
      <path
        d="M12.4414 12.457H21.0002V20.9997H12.4414V12.457Z"
        fill="#FBB811"
      />
    </svg>
  )
}

export default MicrosoftColor
