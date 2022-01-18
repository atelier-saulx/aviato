import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { Text } from '~/components/Text'

/**
 * ContextMenu
 */
const StyledContextMenu = styled('div', {
  background: '$Background2dp',
  minWidth: '256px',
  width: '100%',
  border: '1px solid $OtherDivider',
  borderRadius: '4px',
  pointerEvents: 'all',
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
const StyledItem = styled('div', {
  display: 'flex',
  height: '32px',
  justifyContent: 'start',
  alignItems: 'center',

  '&:hover': {
    background: '$ActionMain',
  },
})

export interface ContextItemProps
  extends ComponentProps<typeof StyledContextMenu> {}

export const ContextItem = forwardRef<
  ElementRef<typeof StyledContextMenu>,
  ContextItemProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  const isText = typeof children === 'string'

  const TextComponent = isText ? (
    <Text color="Inherit">{children}</Text>
  ) : (
    children
  )

  return (
    <StyledItem ref={forwardedRef} {...remainingProps}>
      {TextComponent}
    </StyledItem>
  )
})
