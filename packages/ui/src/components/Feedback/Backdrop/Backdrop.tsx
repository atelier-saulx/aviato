import React, { forwardRef, ElementRef, ComponentProps } from 'react'

import { Portal } from '~/components/Utilities'
import { getZIndex, styled } from '~/theme'

const Container = styled('div', {
  backgroundColor: '$OtherOverlay',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

export interface BackdropProps extends ComponentProps<typeof Container> {
  disablePortal?: boolean
  zIndex?: number
}

export const Backdrop = forwardRef<ElementRef<typeof Container>, BackdropProps>(
  (properties, forwardedRef) => {
    const {
      disablePortal = false,
      zIndex = getZIndex('Overlay'),
      children,
      ...remainingProps
    } = properties

    return (
      <Portal disablePortal={disablePortal} zIndex={zIndex}>
        <Container ref={forwardedRef} {...remainingProps}>
          {children}
        </Container>
      </Portal>
    )
  }
)

Backdrop.displayName = 'Backdrop'
