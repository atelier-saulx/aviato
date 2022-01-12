import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'
import { BaseTextStyles, BaseFontVariants } from './styles'
import { FontWeight, FontColor } from './types'

const StyledTitle = styled('h1', {
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

type ForwardProps = ComponentProps<typeof StyledTitle> & TitleProps

export const Title = React.forwardRef<
  ElementRef<typeof StyledTitle>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    size = 'normal',
    weight = 'bold',
    color = 'Primary',
    ...remainingProps
  } = properties

  return (
    <StyledTitle
      weight={weight}
      color={color}
      size={size}
      ref={forwardedRef}
      {...remainingProps}
    />
  )
})
