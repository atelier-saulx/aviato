import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Checked: FunctionComponent<SvgProps> = ({
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
        d="M10.2977 17C10.6471 17 10.9234 16.8777 11.1184 16.6396L18.7969 7.06202C18.9431 6.87537 19 6.73376 19 6.58572C19 6.23171 18.7075 6 18.2606 6C17.9356 6 17.7568 6.08367 17.5618 6.32826L10.2652 15.5389L6.47882 11.6126C6.27568 11.3874 6.07255 11.2973 5.78003 11.2973C5.31689 11.2973 5 11.5483 5 11.9023C5 12.0503 5.08125 12.2177 5.23564 12.3721L9.4527 16.6267C9.69646 16.8777 9.94835 17 10.2977 17Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Checked
