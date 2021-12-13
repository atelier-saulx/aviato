import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled, StitchedCSS, DefaultProps } from '~/theme'
import { TextStyles } from './styles'

import { FontWeight, FontColor, FontSize } from './types'

const TITLE_TAG = 'h1'

const StyledText = styled(TITLE_TAG, TextStyles)

export interface TitleProps extends DefaultProps {
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
  css?: StitchedCSS
}

type ForwardProps = ComponentProps<typeof StyledText> & TitleProps

export const Title = React.forwardRef<
  ElementRef<typeof TITLE_TAG>,
  ForwardProps
>((properties, forwardedRef) => {
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
})
