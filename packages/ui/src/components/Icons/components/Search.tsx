import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconSearch = (x: IconProps) => {
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
          d="M11.3333 11.3333L14.6666 14.6666L11.3333 11.3333ZM12.9999 7.16659C12.9999 10.3883 10.3883 12.9999 7.16659 12.9999C3.94493 12.9999 1.33325 10.3883 1.33325 7.16659C1.33325 3.94493 3.94493 1.33325 7.16659 1.33325C10.3883 1.33325 12.9999 3.94493 12.9999 7.16659Z"
        />
      </svg>
    </Wrapper>
  )
}

export default IconSearch
