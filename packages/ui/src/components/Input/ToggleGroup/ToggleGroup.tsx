import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import * as RadixToggleGroup from '@radix-ui/react-toggle-group'

import { styled } from '~/theme'

const StyledToggleGroup = styled('div', {})

const StyledToggleRoot = styled(RadixToggleGroup.Root, {
  display: 'inline-flex',
  backgroundColor: '$OtherInputBorderDefault',
  padding: '2px',
  borderRadius: 4,
})

export interface ToggleGroupProps
  extends ComponentProps<typeof StyledToggleGroup> {
  type?: 'single' | 'multiple'
  value?: string
  defaultValue: string
  children: any
  onValueChange?(value: string | string[]): void
  disabled?: boolean
}

export const ToggleGroup = forwardRef<
  ElementRef<typeof StyledToggleGroup>,
  ToggleGroupProps
>((properties, forwardedRef) => {
  const {
    type = 'single',
    defaultValue,
    children,
    ...remainingProps
  } = properties

  const RadixToggleRoot = StyledToggleRoot as any

  return (
    <RadixToggleRoot
      type={type}
      defaultValue={defaultValue}
      ref={forwardedRef}
      {...remainingProps}
    >
      {children}
    </RadixToggleRoot>
  )
})

ToggleGroup.displayName = 'ToggleGroup'
