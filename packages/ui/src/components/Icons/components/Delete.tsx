import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconDelete = (x: IconProps) => {
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
          d="M5.33333 3.99992V2.66659C5.33333 1.93021 5.93029 1.33325 6.66667 1.33325H9.33333C10.0697 1.33325 10.6667 1.93021 10.6667 2.66659V3.99992M2 3.99992H14H2ZM3.33333 3.99992V13.3333C3.33333 14.0697 3.93029 14.6666 4.66667 14.6666H11.3333C12.0697 14.6666 12.6667 14.0697 12.6667 13.3333V3.99992H3.33333Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.87}
          strokeWidth={1.33333}
          d="M9.33325 7.33325V11.3333"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.87}
          strokeWidth={1.33333}
          d="M6.66675 7.33325V11.3333"
        />
      </svg>
    </Wrapper>
  )
}

export default IconDelete
