import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconGoogle = (x: IconProps) => {
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
          fill="currentColor"
          fillOpacity={0.87}
          d="M16 8.1871C16 12.7516 12.823 16 8.13115 16C3.63279 16 0 12.4258 0 8C0 3.57419 3.63279 0 8.13115 0C10.3213 0 12.1639 0.790323 13.5836 2.09355L11.3705 4.1871C8.47541 1.43871 3.0918 3.50323 3.0918 8C3.0918 10.7903 5.35738 13.0516 8.13115 13.0516C11.3508 13.0516 12.5574 10.7806 12.7475 9.60323H8.13115V6.85161H15.8721C15.9475 7.26129 16 7.65484 16 8.1871Z"
        />
      </svg>
    </Wrapper>
  )
}

export default IconGoogle
