import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconClose = (x: IconProps) => {
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
          fillRule="evenodd"
          d="M3.46925 3.4702C3.20955 3.7299 3.20955 4.15096 3.46925 4.41066L6.77197 7.71338L3.50936 10.976C3.22818 11.2572 3.22818 11.713 3.50936 11.9942C3.79054 12.2754 4.24642 12.2754 4.5276 11.9942L7.79021 8.73161L11.0141 11.9555C11.2738 12.2152 11.6948 12.2152 11.9545 11.9555C12.2142 11.6958 12.2142 11.2747 11.9545 11.015L8.73066 7.79116L11.9946 4.52718C12.2758 4.246 12.2758 3.79012 11.9946 3.50894C11.7135 3.22777 11.2576 3.22777 10.9764 3.50894L7.71243 6.77293L4.4097 3.4702C4.15 3.21051 3.72895 3.2105 3.46925 3.4702Z"
          clipRule="evenodd"
        />
      </svg>
    </Wrapper>
  )
}

export default IconClose
