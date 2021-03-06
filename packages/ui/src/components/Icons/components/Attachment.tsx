import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconAttachment = (x: IconProps) => {
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
          d="M14.2936 7.36678L8.16694 13.4934C7.41638 14.244 6.3984 14.6657 5.33694 14.6657C4.27549 14.6657 3.2575 14.244 2.50694 13.4934C1.75638 12.7429 1.33472 11.7249 1.33472 10.6634C1.33472 9.60199 1.75638 8.58401 2.50694 7.83344L8.63361 1.70678C9.13398 1.2064 9.81264 0.925293 10.5203 0.925293C11.2279 0.925293 11.9066 1.2064 12.4069 1.70678C12.9073 2.20715 13.1884 2.88581 13.1884 3.59344C13.1884 4.30108 12.9073 4.97973 12.4069 5.48011L6.27361 11.6068C6.02342 11.857 5.68409 11.9975 5.33027 11.9975C4.97646 11.9975 4.63713 11.857 4.38694 11.6068C4.13675 11.3566 3.9962 11.0173 3.9962 10.6634C3.9962 10.3096 4.13675 9.9703 4.38694 9.72011L10.0469 4.06678"
        />
      </svg>
    </Wrapper>
  )
}

export default IconAttachment
