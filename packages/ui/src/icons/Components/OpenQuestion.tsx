import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const OpenQuestion: FunctionComponent<SvgProps> = ({
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
        d="M8.77314 18C9.02087 18 9.20508 17.8747 9.50363 17.599L11.7967 15.5316L16.0907 15.5378C17.9837 15.5441 19 14.5041 19 12.6684V7.8694C19 6.03373 17.9837 5 16.0907 5H7.90926C6.01633 5 5 6.02747 5 7.8694V12.6684C5 14.5104 6.01633 15.5316 7.90926 15.5316H8.2078V17.3547C8.2078 17.7431 8.41107 18 8.77314 18ZM11.9873 13.2511C11.6506 13.2511 11.4664 13.0067 11.4664 12.6622V8.13253H9.85935C9.60526 8.13253 9.4147 7.96337 9.4147 7.70651C9.4147 7.43711 9.60526 7.28048 9.85935 7.28048H14.147C14.4011 7.28048 14.5853 7.43711 14.5853 7.70651C14.5853 7.96337 14.4011 8.13253 14.147 8.13253H12.5209V12.6622C12.5209 13.0193 12.3367 13.2511 11.9873 13.2511Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default OpenQuestion
