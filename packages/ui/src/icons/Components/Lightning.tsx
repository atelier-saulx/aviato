import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Lightning: FunctionComponent<SvgProps> = ({
  color,
  framed,
  size,
  frameColor,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 426.387 426.387" fill="none">
      {framed ? (
        <rect
          width="426.387"
          height="426.387"
          rx="71.0645"
          fill={useColor(frameColor)}
        />
      ) : null}
      <g transform="translate(50,50)">
        <polygon
          fill={useColor(color)}
          points="252.086,178.355 171.154,144.27 231.9,0 74.301,148.018 155.236,182.104 94.487,326.387 "
        />
      </g>
    </svg>
  )
}

export default Lightning
