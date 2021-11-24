import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Star: FunctionComponent<SvgProps> = ({
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
        d="M14.9577 16.2066L14.169 12.8216L16.7981 10.554L13.3474 10.2582L12 7.10329L10.6526 10.2911L7.20188 10.554L9.83099 12.8216L9.04225 16.2066L12 14.4319L14.9577 16.2066ZM7.03756 7.07042C8.41784 5.69014 10.072 5 12 5C13.928 5 15.5712 5.69014 16.9296 7.07042C18.3099 8.42879 19 10.072 19 12C19 13.928 18.3099 15.5822 16.9296 16.9624C15.5712 18.3208 13.928 19 12 19C10.072 19 8.41784 18.3208 7.03756 16.9624C5.67919 15.5822 5 13.928 5 12C5 10.072 5.67919 8.42879 7.03756 7.07042Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Star
