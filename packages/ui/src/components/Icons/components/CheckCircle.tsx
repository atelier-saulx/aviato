import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconCheckCircle = (x: IconProps) => {
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
          d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.13807 8.17575L6.6067 9.49751L10.8091 5.22933C11.0366 4.96877 11.4557 4.92351 11.7452 5.12823C12.0347 5.33296 12.085 5.71015 11.8575 5.97072L7.19087 10.7707C6.94393 11.0535 6.47787 11.0786 6.19525 10.8243L4.19526 9.02427C3.93491 8.78996 3.93491 8.41006 4.19526 8.17575C4.45561 7.94143 4.87772 7.94143 5.13807 8.17575Z"
          clipRule="evenodd"
        />
      </svg>
    </Wrapper>
  )
}

export default IconCheckCircle
