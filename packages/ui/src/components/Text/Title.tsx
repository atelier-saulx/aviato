import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'
import { BaseTextStyles, BaseFontVariants } from './styles'

import { FontWeight, FontColor } from './types'

const TITLE_TAG = 'h1'

const StyledText = styled(TITLE_TAG, {
  ...BaseTextStyles,

  variants: {
    ...BaseFontVariants,

    size: {
      small: {
        fontSize: '$xl',
        lineHeight: '$xl',
      },
      normal: {
        fontSize: '$xxl',
        lineHeight: '$xxl',
      },
    },
  },
})

type TitleSize = 'small' | 'normal'

export interface TitleProps {
  size?: TitleSize
  weight?: FontWeight
  color?: FontColor
}

type ForwardProps = ComponentProps<typeof StyledText> & TitleProps

export const Title = React.forwardRef<
  ElementRef<typeof TITLE_TAG>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    size = 'normal',
    weight = 'bold',
    color = 'Primary',
    ...remainingProps
  } = properties

  return (
    <StyledText
      as={TITLE_TAG}
      weight={weight}
      color={color}
      size={size}
      ref={forwardedRef}
      {...remainingProps}
    />
  )
})
