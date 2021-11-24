import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const ChevronRight: FunctionComponent<SvgProps> = ({
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
        d="M16 12C16 12.2016 15.9264 12.379 15.771 12.5323L9.28425 18.7823C9.14519 18.9274 8.96524 19 8.75256 19C8.3272 19 8 18.6855 8 18.2661C8 18.0565 8.08998 17.879 8.22086 17.7419L14.1759 12L8.22086 6.25806C8.08998 6.12097 8 5.93548 8 5.73387C8 5.31452 8.3272 5 8.75256 5C8.96524 5 9.14519 5.07258 9.28425 5.20968L15.771 11.4677C15.9264 11.6129 16 11.7984 16 12Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default ChevronRight
