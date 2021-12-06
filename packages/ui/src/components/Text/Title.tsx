import React, { ComponentProps, ElementRef, forwardRef } from 'react'
import { styled, CSS } from '~/theme'
import { TextStyles } from './styles'

import { FontWeight, FontColor, FontSize } from './types'

const TITLE_TAG = 'h1'

const StyledText = styled(TITLE_TAG, TextStyles)

export type TitleProps = {
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
  css?: CSS
}

type ForwardProps = ComponentProps<typeof TITLE_TAG> & TitleProps

export const Title = forwardRef<ElementRef<typeof TITLE_TAG>, ForwardProps>(
  (properties, forwardedRef) => {
    const {
      weight = 'Semibold',
      color = 'Primary',
      size = 'Medium',
      ...remainingProps
    } = properties

    return (
      <StyledText
        as={TITLE_TAG}
        weight={weight}
        color={color}
        size={size}
        {...remainingProps}
        ref={forwardedRef}
      />
    )
  }
)
