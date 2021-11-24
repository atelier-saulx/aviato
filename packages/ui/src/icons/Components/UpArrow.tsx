import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const UpArrow: FunctionComponent<SvgProps> = ({
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
        d="M12.7071 6.29289L15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071C15.3166 11.0976 14.6834 11.0976 14.2929 10.7071L13 9.414V17C13 17.5523 12.5523 18 12 18C11.4872 18 11.0645 17.614 11.0067 17.1166L11 17V9.414L9.70711 10.7071C9.31658 11.0976 8.68342 11.0976 8.29289 10.7071C7.90237 10.3166 7.90237 9.68342 8.29289 9.29289L11.2929 6.29289C11.6834 5.90237 12.3166 5.90237 12.7071 6.29289Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default UpArrow
