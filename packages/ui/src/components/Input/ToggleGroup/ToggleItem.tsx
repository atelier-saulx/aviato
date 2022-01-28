import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import * as RadixToggleGroup from '@radix-ui/react-toggle-group'

import { styled } from '~/theme'

const StyledToggleItem = styled('div', {})

const GroupToggleItem = styled(RadixToggleGroup.Item, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
  lineHeight: 1,
  height: 28,
  padding: '10px',
  borderRadius: 4,
  color: '$TextPrimary',

  '&:hover': {},
  '&:focus': {},

  '&[data-state=on]': {
    background: '$OtherForeground',
  },
})

export interface ToggleItemProps
  extends ComponentProps<typeof StyledToggleItem> {
  value: string
  disabled?: boolean
}

export const ToggleItem = forwardRef<
  ElementRef<typeof StyledToggleItem>,
  ToggleItemProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  const RadixItem = GroupToggleItem as any

  return (
    <RadixItem ref={forwardedRef} {...remainingProps}>
      {children}
    </RadixItem>
  )
})

ToggleItem.displayName = 'ToggleItem'
