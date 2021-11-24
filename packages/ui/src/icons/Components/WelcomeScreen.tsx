import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const WelcomeScreen: FunctionComponent<SvgProps> = ({
  color,
  framed,
  size,
  frameColor,
}) => {
  const c = useColor(color)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {framed ? (
        <rect width="24" height="24" rx="4" fill={useColor(frameColor)} />
      ) : null}
      <path
        d="M5.875 18C5.39175 18 5 17.6082 5 17.125L5 6.875C5 6.39175 5.39175 6 5.875 6L10.25 6C10.7332 6 11.125 6.39175 11.125 6.875L11.125 17.125C11.125 17.6082 10.7332 18 10.25 18L5.875 18Z"
        fill={c}
      />
      <rect
        opacity="0.7"
        x="12"
        y="7.71423"
        width="3.5"
        height="8.57143"
        rx="0.4375"
        fill={c}
      />
      <rect
        opacity="0.4"
        x="16.375"
        y="9.42859"
        width="2.625"
        height="5.14286"
        rx="0.175"
        fill={c}
      />
    </svg>
  )
}

export default WelcomeScreen
