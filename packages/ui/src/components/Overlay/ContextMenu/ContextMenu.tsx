import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { Text } from '~/components/Text'
import { Switch } from '~/components/Input'

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
  paddingLeft: '16px',

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

  const ChildVariant = isText ? (
    <Text color="Inherit">{children}</Text>
  ) : (
    children
  )

  return (
    <StyledItem ref={forwardedRef} {...remainingProps}>
      {ChildVariant}
    </StyledItem>
  )
})

/**
 * Toggle
 */
const StyledToggle = styled('div', {
  display: 'flex',
  height: '32px',
  width: '100%',
  justifyContent: 'start',
  alignItems: 'center',
  paddingLeft: '16px',

  '&:hover': {
    background: '$ActionMain',
  },
})

const SwitchItem = styled('div', {
  justifySelf: 'end',
  marginLeft: 'auto',
  display: 'flex',
  justifyContent: 'end',
  paddingRight: '12px',
})

export interface ContextToggleProps
  extends ComponentProps<typeof StyledContextMenu> {}

export const ContextToggle = forwardRef<
  ElementRef<typeof StyledContextMenu>,
  ContextToggleProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  const isText = typeof children === 'string'

  const ChildVariant = isText ? (
    <Text color="Inherit">{children}</Text>
  ) : (
    children
  )

  return (
    <StyledToggle ref={forwardedRef} {...remainingProps}>
      {ChildVariant}

      <SwitchItem>
        <Switch />
      </SwitchItem>
    </StyledToggle>
  )
})
