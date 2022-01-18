import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'

/**
 * ContextMenu
 */
const StyledContextMenu = styled('div', {
  background: '$Background2dp',
  minWidth: '256px',
  width: '100%',
  border: '1px solid $OtherDivider',
  borderRadius: '4px',
})

export interface ContextMenuProps
  extends ComponentProps<typeof StyledContextMenu> {}

export const ContextMenu = forwardRef<
  ElementRef<typeof StyledContextMenu>,
  ContextMenuProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledContextMenu ref={forwardedRef} {...remainingProps}>
      {children}
    </StyledContextMenu>
  )
})

/**
 * Item
 */
const StyledItem = styled('div', {})

export interface ContextItemProps
  extends ComponentProps<typeof StyledContextMenu> {}

export const ContextItem = forwardRef<
  ElementRef<typeof StyledContextMenu>,
  ContextMenuProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledItem ref={forwardedRef} {...remainingProps}>
      {children}
    </StyledItem>
  )
})
