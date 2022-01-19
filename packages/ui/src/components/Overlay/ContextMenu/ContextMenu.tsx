import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'

const StyledBase = styled('div', {
  background: '$Background2dp',
  minWidth: '256px',
  width: '100%',
  border: '1px solid $OtherDivider',
  borderRadius: '4px',
  pointerEvents: 'all',
})

export interface ContextMenuProps extends ComponentProps<typeof StyledBase> {}

export const ContextMenu = forwardRef<
  ElementRef<typeof StyledBase>,
  ContextMenuProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledBase ref={forwardedRef} {...remainingProps}>
      {children}
    </StyledBase>
  )
})
