import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const ToggleOn: FunctionComponent<SvgProps> = ({
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
        d="M16 4C18.2222 4 20.1111 4.77778 21.6667 6.33333C23.2222 7.88889 24 9.77778 24 12C24 14.2222 23.2222 16.1111 21.6667 17.6667C20.1111 19.2222 18.2222 20 16 20L8 20C5.77778 20 3.88889 19.2222 2.33333 17.6667C0.777778 16.1111 0 14.2222 0 12C0 9.77778 0.777778 7.88889 2.33333 6.33333C3.88889 4.77778 5.77778 4 8 4L16 4ZM12.2083 15.7917C13.2639 16.8194 14.5278 17.3333 16 17.3333C17.4722 17.3333 18.7222 16.8194 19.75 15.7917C20.8056 14.7361 21.3333 13.4722 21.3333 12C21.3333 10.5278 20.8056 9.27778 19.75 8.25C18.7222 7.19444 17.4722 6.66667 16 6.66667C14.5278 6.66667 13.2639 7.19444 12.2083 8.25C11.1806 9.27778 10.6667 10.5278 10.6667 12C10.6667 13.4722 11.1806 14.7361 12.2083 15.7917Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default ToggleOn
