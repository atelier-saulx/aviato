import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Edit: FunctionComponent<SvgProps> = ({
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
        d="M19.6953 4.84567L20.2578 4.26754C20.5234 3.98629 20.5234 3.61129 20.2578 3.35348L20.0781 3.16598C19.8359 2.92379 19.4531 2.95504 19.1953 3.20504L18.625 3.76754L19.6953 4.84567ZM10.2969 13.3691L11.8203 12.705L19.1172 5.41598L18.0469 4.36129L10.7578 11.6504L10.0547 13.1191C9.99219 13.2519 10.1484 13.4316 10.2969 13.3691ZM7.45312 18.4316H16.625C18.0312 18.4316 18.8438 17.6191 18.8438 16.0097V7.65817L17.5859 8.91598V15.9472C17.5859 16.7597 17.1484 17.1738 16.6094 17.1738H7.47656C6.69531 17.1738 6.25781 16.7597 6.25781 15.9472V7.08004C6.25781 6.26754 6.69531 5.84567 7.47656 5.84567H14.5938L15.8516 4.58785H7.45312C5.82812 4.58785 5 5.40035 5 7.00973V16.0097C5 17.6269 5.82812 18.4316 7.45312 18.4316Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Edit
