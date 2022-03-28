import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconArrowRight = (x: IconProps) => {
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
          d="M8.47132 2.86177C8.21097 2.60142 7.78886 2.60142 7.52851 2.86177C7.26816 3.12212 7.26816 3.54423 7.52851 3.80458L11.0572 7.33325H3.33317C2.96498 7.33325 2.6665 7.63173 2.6665 7.99992C2.6665 8.36811 2.96498 8.66658 3.33317 8.66658H11.057L7.52851 12.1951C7.26816 12.4554 7.26816 12.8776 7.52851 13.1379C7.78886 13.3983 8.21097 13.3983 8.47132 13.1379L13.138 8.47124C13.3983 8.21089 13.3983 7.78878 13.138 7.52843L8.47132 2.86177Z"
          clipRule="evenodd"
        />
      </svg>
    </Wrapper>
  )
}

export default IconArrowRight
