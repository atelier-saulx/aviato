import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'

const StyledTextField = styled('div', {})

export interface TextFieldProps {}

type ForwardProps = ComponentProps<typeof StyledTextField> & TextFieldProps

export const TextField = React.forwardRef<
  ElementRef<typeof StyledTextField>,
  ForwardProps
>((properties, forwardedRef) => {
  const { ...remainingProps } = properties

  return (
    <StyledTextField ref={forwardedRef} {...remainingProps}>
      TextField
    </StyledTextField>
  )
})
