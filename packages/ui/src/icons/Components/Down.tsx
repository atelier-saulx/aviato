import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Down: FunctionComponent<SvgProps> = ({
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
        d="M12.0032 16C12.1615 16 12.3198 15.9387 12.4275 15.8221L17.329 10.9571C17.4367 10.8528 17.5 10.7178 17.5 10.5644C17.5 10.2454 17.253 10 16.9237 10C16.7654 10 16.6197 10.0613 16.5121 10.1595L12.0032 14.6258L7.48791 10.1595C7.38659 10.0613 7.24093 10 7.07628 10C6.74698 10 6.5 10.2454 6.5 10.5644C6.5 10.7178 6.56333 10.8528 6.67098 10.9632L11.5725 15.8221C11.6929 15.9387 11.8385 16 12.0032 16Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Down
