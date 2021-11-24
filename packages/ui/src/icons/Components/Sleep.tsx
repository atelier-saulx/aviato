import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Sleep: FunctionComponent<SvgProps> = ({
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
        d="M7.94649 7.65505C5.35117 10.2504 5.35117 14.4582 7.94649 17.0535C10.5418 19.6488 14.7496 19.6488 17.3449 17.0535C18.1433 16.2551 18.6928 15.3048 19 14.2951C16.7275 14.9865 14.1569 14.437 12.36 12.64C10.563 10.8431 10.0135 8.27255 10.7049 6C9.69524 6.30718 8.74485 6.85669 7.94649 7.65505Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Sleep
