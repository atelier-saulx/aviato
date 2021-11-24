import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Upload: FunctionComponent<SvgProps> = ({
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
        d="M19 14C19.5128 14 19.9355 14.386 19.9933 14.8834L20 15V17C20 18.5977 18.7511 19.9037 17.1763 19.9949L17 20H7C5.40232 20 4.09634 18.7511 4.00509 17.1763L4 17V15C4 14.4477 4.44772 14 5 14C5.51284 14 5.93551 14.386 5.99327 14.8834L6 15V17C6 17.5128 6.38604 17.9355 6.88338 17.9933L7 18H17C17.5128 18 17.9355 17.614 17.9933 17.1166L18 17V15C18 14.4477 18.4477 14 19 14ZM12.7071 4.29289L15.7071 7.29289C16.0976 7.68342 16.0976 8.31658 15.7071 8.70711C15.3166 9.09763 14.6834 9.09763 14.2929 8.70711L13 7.414V15C13 15.5523 12.5523 16 12 16C11.4872 16 11.0645 15.614 11.0067 15.1166L11 15V7.414L9.70711 8.70711C9.31658 9.09763 8.68342 9.09763 8.29289 8.70711C7.90237 8.31658 7.90237 7.68342 8.29289 7.29289L11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Upload
