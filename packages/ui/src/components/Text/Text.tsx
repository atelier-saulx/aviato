import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'
import { BaseFontVariants, BaseTextStyles } from './styles'

import { FontWeight, FontColor } from './types'

const StyledText = styled('p', {
  ...BaseTextStyles,

  variants: {
    ...BaseFontVariants,

    size: {
      extrasmall: {
        fontSize: '$xs',
        lineHeight: '$xs',
      },
      small: {
        fontSize: '$sm',
        lineHeight: '$sm',
      },
      medium: {
        fontSize: '$md',
        lineHeight: '$md',
      },
      large: {
        fontSize: '$lg',
        lineHeight: '$lg',
      },
      extralarge: {
        fontSize: '$xl',
        lineHeight: '$xl',
      },
    },
  },
})

type TextSize = 'extrasmall' | 'small' | 'medium' | 'large' | 'extralarge'

export interface TextProps {
  size?: TextSize
  weight?: FontWeight
  color?: FontColor
}

type ForwardProps = ComponentProps<typeof StyledText> & TextProps

export const Text = React.forwardRef<
  ElementRef<typeof StyledText>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    size = 'medium',
    weight = 'regular',
    color = 'Inherit',
    ...remainingProps
  } = properties

  return (
    <StyledText
      color={color}
      size={size}
      weight={weight}
      ref={forwardedRef}
      {...remainingProps}
    />
  )
})
