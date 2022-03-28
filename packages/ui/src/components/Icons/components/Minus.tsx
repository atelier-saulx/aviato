import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconMinus = (x: IconProps) => {
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
        <rect
          width={12}
          height={2}
          x={2}
          y={7}
          fill="currentColor"
          fillOpacity={0.87}
          rx={1}
        />
      </svg>
    </Wrapper>
  )
}

export default IconMinus
