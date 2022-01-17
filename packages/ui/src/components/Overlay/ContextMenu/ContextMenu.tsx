import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'

const Container = styled('div', {})

export interface ContextMenuProps extends ComponentProps<typeof Container> {}

export const ContextMenu = forwardRef<
  ElementRef<typeof Container>,
  ContextMenuProps
>((properties, forwardedRef) => {
  const { ...remainingProps } = properties

  return (
    <Container ref={forwardedRef} {...remainingProps}>
      ContextMenu
    </Container>
  )
})
