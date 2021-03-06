import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconCloseCircle = (x: IconProps) => {
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
          d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM10.7204 5.27981C10.9801 5.5395 10.9801 5.96056 10.7204 6.22026L8.94054 8.00009L10.7204 9.77993C10.9801 10.0396 10.9801 10.4607 10.7204 10.7204C10.4607 10.9801 10.0396 10.9801 9.77993 10.7204L8.00009 8.94054L6.22026 10.7204C5.96056 10.9801 5.5395 10.9801 5.27981 10.7204C5.02011 10.4607 5.02011 10.0396 5.27981 9.77993L7.05964 8.00009L5.27981 6.22026C5.02011 5.96056 5.02011 5.5395 5.27981 5.27981C5.5395 5.02011 5.96056 5.02011 6.22026 5.27981L8.00009 7.05964L9.77993 5.27981C10.0396 5.02011 10.4607 5.02011 10.7204 5.27981Z"
          clipRule="evenodd"
        />
      </svg>
    </Wrapper>
  )
}

export default IconCloseCircle
