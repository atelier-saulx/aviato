import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Close: FunctionComponent<SvgProps> = ({
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
        d="M16.5962 7.40381C16.954 7.76157 16.954 8.34162 16.5962 8.69938L13.2956 12L16.5962 15.3006C16.954 15.6584 16.954 16.2384 16.5962 16.5962C16.2384 16.954 15.6584 16.954 15.3006 16.5962L12 13.2956L8.69938 16.5962C8.34162 16.954 7.76157 16.954 7.40381 16.5962C7.04605 16.2384 7.04605 15.6584 7.40381 15.3006L10.7044 12L7.40381 8.69938C7.04605 8.34162 7.04605 7.76157 7.40381 7.40381C7.76157 7.04604 8.34162 7.04604 8.69938 7.40381L12 10.7044L15.3006 7.40381C15.6584 7.04604 16.2384 7.04604 16.5962 7.40381Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Close
