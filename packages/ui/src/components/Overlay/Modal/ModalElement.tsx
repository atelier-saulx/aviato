import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'

const StyledModalElement = styled('div', {
  position: 'relative',
  minWidth: '600px',
  background: '$Background1dp',
  zIndex: 5,
})

const ContentArea = styled('div', {
  padding: '24px',
})

const ButtonArea = styled('div', {})

export type ModalButton = {
  text: string
  onClick: () => void
}

export interface ModalElementProps
  extends ComponentProps<typeof StyledModalElement> {
  buttons?: ModalButton[]
}

export const ModalElement = forwardRef<
  ElementRef<typeof StyledModalElement>,
  ModalElementProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledModalElement ref={forwardedRef} {...remainingProps}>
      <ContentArea>{children}</ContentArea>

      <ButtonArea />
    </StyledModalElement>
  )
})
