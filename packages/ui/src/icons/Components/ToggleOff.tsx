import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const ToggleOff: FunctionComponent<SvgProps> = ({
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
        d="M8 20C5.77778 20 3.88889 19.2222 2.33333 17.6667C0.777776 16.1111 -5.05109e-07 14.2222 -6.99382e-07 12C-8.93655e-07 9.77778 0.777776 7.88889 2.33333 6.33333C3.88889 4.77778 5.77778 4 8 4L16 4C18.2222 4 20.1111 4.77778 21.6667 6.33333C23.2222 7.88889 24 9.77778 24 12C24 14.2222 23.2222 16.1111 21.6667 17.6667C20.1111 19.2222 18.2222 20 16 20L8 20ZM11.7917 8.20833C10.7361 7.18056 9.47222 6.66667 8 6.66667C6.52778 6.66667 5.27778 7.18056 4.25 8.20833C3.19444 9.26389 2.66667 10.5278 2.66667 12C2.66667 13.4722 3.19444 14.7222 4.25 15.75C5.27778 16.8056 6.52778 17.3333 8 17.3333C9.47222 17.3333 10.7361 16.8056 11.7917 15.75C12.8194 14.7222 13.3333 13.4722 13.3333 12C13.3333 10.5278 12.8194 9.26389 11.7917 8.20833Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default ToggleOff
