import React, { forwardRef, ElementRef, ComponentProps } from 'react'
import { styled } from '~/theme'

const Container = styled('div', {
  backgroundColor: '$OtherOverlay',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

export const Backdrop = forwardRef<
  ElementRef<typeof Container>,
  ComponentProps<typeof Container>
>(({ children, ...props }, forwardedRef) => {
  return (
    <Container ref={forwardedRef} {...props}>
      {children}
    </Container>
  )
})
