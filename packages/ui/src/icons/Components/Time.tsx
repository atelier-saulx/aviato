import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Time: FunctionComponent<SvgProps> = ({
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
        d="M12 18C15.2824 18 18 15.2765 18 12C18 8.71765 15.2765 6 11.9941 6C8.71765 6 6 8.71765 6 12C6 15.2765 8.72353 18 12 18ZM12 17C9.22353 17 7.00588 14.7765 7.00588 12C7.00588 9.22353 9.21765 7 11.9941 7C14.7706 7 16.9941 9.22353 17 12C17.0059 14.7765 14.7765 17 12 17ZM8.92353 12.6353H11.9941C12.2235 12.6353 12.4059 12.4588 12.4059 12.2235V8.25882C12.4059 8.02941 12.2235 7.85294 11.9941 7.85294C11.7647 7.85294 11.5882 8.02941 11.5882 8.25882V11.8176H8.92353C8.68824 11.8176 8.51176 11.9941 8.51176 12.2235C8.51176 12.4588 8.68824 12.6353 8.92353 12.6353Z"
        fill={useColor(color)}
        stroke={useColor(color)}
        strokeWidth="0.4"
      />
    </svg>
  )
}

export default Time
