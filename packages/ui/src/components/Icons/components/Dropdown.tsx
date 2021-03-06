import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconDropdown = (x: IconProps) => {
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
          d="M3.25611 15.2H12.744C14.3866 15.2 15.2 14.3866 15.2 12.7753V3.22482C15.2 1.61352 14.3866 0.800049 12.744 0.800049H3.25611C1.62134 0.800049 0.800049 1.6057 0.800049 3.22482V12.7753C0.800049 14.3944 1.62134 15.2 3.25611 15.2ZM8.81743 10.5695C8.30901 11.1092 7.72237 11.1092 7.21395 10.5695L4.05393 7.21395C3.80363 6.95583 3.80363 6.58821 4.02265 6.35355C4.27294 6.09543 4.66404 6.09543 4.89087 6.33791L8.0196 9.64655L11.1405 6.33791C11.3673 6.09543 11.7506 6.10325 12.0087 6.35355C12.2356 6.58039 12.2278 6.95583 11.9775 7.21395L8.81743 10.5695Z"
        />
      </svg>
    </Wrapper>
  )
}

export default IconDropdown
