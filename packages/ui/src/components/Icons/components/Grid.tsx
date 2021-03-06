import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconGrid = (x: IconProps) => {
  let { color, css, onClick, ...props } = x

  if (!css) {
    css = {
      color,
    }
  }

  if (!css.color) {
    css.color = color
  }

  return (
    <Wrapper onClick={onClick} css={css}>
      <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.87}
          strokeWidth={1.33333}
          d="M6.66667 2H2V6.66667H6.66667V2Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.87}
          strokeWidth={1.33333}
          d="M13.9999 2H9.33325V6.66667H13.9999V2Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.87}
          strokeWidth={1.33333}
          d="M13.9999 9.33325H9.33325V13.9999H13.9999V9.33325Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.87}
          strokeWidth={1.33333}
          d="M6.66667 9.33325H2V13.9999H6.66667V9.33325Z"
        />
      </svg>
    </Wrapper>
  )
}

export default IconGrid
