import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconChevronDown = (x: IconProps) => {
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
          d="M2 5L8 11L14 5"
        />
      </svg>
    </Wrapper>
  )
}

export default IconChevronDown
