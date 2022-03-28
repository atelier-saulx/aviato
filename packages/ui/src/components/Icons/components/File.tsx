import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconFile = (x: IconProps) => {
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
          d="M8.66675 1.33325H4.00008C3.64646 1.33325 3.30732 1.47373 3.05727 1.72378C2.80722 1.97382 2.66675 2.31296 2.66675 2.66659V13.3333C2.66675 13.6869 2.80722 14.026 3.05727 14.2761C3.30732 14.5261 3.64646 14.6666 4.00008 14.6666H12.0001C12.3537 14.6666 12.6928 14.5261 12.9429 14.2761C13.1929 14.026 13.3334 13.6869 13.3334 13.3333V5.99992M8.66675 1.33325L13.3334 5.99992M8.66675 1.33325V5.99992H13.3334"
        />
      </svg>
    </Wrapper>
  )
}

export default IconFile
