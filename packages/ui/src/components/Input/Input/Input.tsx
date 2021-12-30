import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'

const StyledInput = styled('input', {})

export interface InputProps {}

type ForwardProps = ComponentProps<typeof StyledInput> & InputProps

export const Input = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const { ...remainingProps } = properties

  return <StyledInput ref={forwardedRef} {...remainingProps} />
})
