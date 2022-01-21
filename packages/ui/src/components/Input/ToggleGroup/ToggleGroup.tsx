import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import * as RadixToggleGroup from '@radix-ui/react-toggle-group'

import { styled } from '~/theme'

const StyledToggleGroup = styled('div', {})

const GroupToggleRoot = styled(RadixToggleGroup.Root, {
  display: 'inline-flex',
  backgroundColor: '$OtherInputBorderDefault',
  padding: '2px',
  borderRadius: 4,
})

const GroupToggleItem = styled(RadixToggleGroup.Item, {
  display: 'flex',
  fontSize: 15,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 1,
  padding: '10px',
  borderRadius: 4,
  color: '$TextPrimary',

  '&:hover': {
    // backgroundColor: 'green',
  },

  '&[data-state=on]': {
    background: '$OtherForeground',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px rgba(0,0,0,0.1)',
  },
})

export interface ToggleGroupProps
  extends ComponentProps<typeof StyledToggleGroup> {}

export const ToggleGroup = forwardRef<
  ElementRef<typeof StyledToggleGroup>,
  ToggleGroupProps
>((properties, forwardedRef) => {
  const { ...remainingProps } = properties

  return (
    <StyledToggleGroup ref={forwardedRef} {...remainingProps}>
      <GroupToggleRoot type="single" defaultValue="first">
        <GroupToggleItem value="first">First</GroupToggleItem>
        <GroupToggleItem value="second">Second</GroupToggleItem>
        <GroupToggleItem value="third">Third</GroupToggleItem>
        <GroupToggleItem value="fourth">Fourth</GroupToggleItem>
      </GroupToggleRoot>
    </StyledToggleGroup>
  )
})
