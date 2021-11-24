import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Date: FunctionComponent<SvgProps> = ({
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
        d="M17.6197 18.5362V9.10638H6.38028V18.5362H17.6197ZM17.6197 5.46383C17.9922 5.46383 18.3099 5.61135 18.5728 5.90638C18.8576 6.20142 19 6.54184 19 6.92766V18.5362C19 18.922 18.8576 19.2624 18.5728 19.5574C18.3099 19.8525 17.9922 20 17.6197 20H6.38028C6.00782 20 5.67919 19.8525 5.39437 19.5574C5.13146 19.2624 5 18.922 5 18.5362V6.92766C5 6.54184 5.13146 6.20142 5.39437 5.90638C5.67919 5.61135 6.00782 5.46383 6.38028 5.46383H7.10329V4H8.48357V5.46383H15.5164V4H16.8967V5.46383H17.6197Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Date
