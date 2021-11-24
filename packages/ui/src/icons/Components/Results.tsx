import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Results: FunctionComponent<SvgProps> = ({
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
      <rect
        x="10.0908"
        y="3.72754"
        width="3.81817"
        height="15.9091"
        rx="0.48"
        fill={useColor(color)}
      />
      <rect
        x="15.1816"
        y="7.2627"
        width="3.81817"
        height="12.3737"
        rx="0.48"
        fill={useColor(color)}
        fillOpacity="0.7"
      />
      <rect
        x="5"
        y="12.5664"
        width="3.81817"
        height="7.07069"
        rx="0.48"
        fill={useColor(color)}
        fillOpacity="0.4"
      />
    </svg>
  )
}

export default Results
