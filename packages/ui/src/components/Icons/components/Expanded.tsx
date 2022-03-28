import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconExpanded = (x: IconProps) => {
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
          d="M12.1656 5C12.8086 5 13.2093 5.50233 12.8852 5.90232L8.71968 10.7023C8.39818 11.0992 7.60182 11.0992 7.28032 10.7023L3.11475 5.90232C2.79074 5.50233 3.19139 5 3.83443 5L12.1656 5Z"
          clipRule="evenodd"
        />
      </svg>
    </Wrapper>
  )
}

export default IconExpanded
