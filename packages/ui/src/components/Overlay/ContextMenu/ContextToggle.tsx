import React, { ComponentProps, forwardRef, ElementRef } from 'react'
import { styled } from '@stitches/react'
import { isText } from '@aviato/utils'

import { Text } from '~/components/Text'
import { Switch } from '~/components/Input'

const StyledContextToggle = styled('div', {
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

const SwitchContainer = styled('div', {
  justifySelf: 'end',
  marginLeft: 'auto',
  display: 'flex',
  justifyContent: 'end',
  paddingRight: '12px',
})

export interface ContextToggleProps
  extends ComponentProps<typeof StyledContextToggle> {}

export const ContextToggle = forwardRef<
  ElementRef<typeof StyledContextToggle>,
  ContextToggleProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  const ChildVariant = isText(children) ? (
    <Text color="inherit">{children}</Text>
  ) : (
    children
  )

  return (
    <StyledContextToggle ref={forwardedRef} {...remainingProps}>
      {ChildVariant}

      <SwitchContainer>
        <Switch />
      </SwitchContainer>
    </StyledContextToggle>
  )
})
