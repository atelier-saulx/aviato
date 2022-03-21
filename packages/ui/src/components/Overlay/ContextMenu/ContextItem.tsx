import React, { ComponentProps, forwardRef, ElementRef } from 'react'
import { styled } from '@stitches/react'
import { isText } from '@aviato/utils'

import { Text } from '~/components/Text'

const StyledContextItem = styled('div', {
  display: 'flex',
  height: '32px',
  justifyContent: 'start',
  alignItems: 'center',
  paddingLeft: '16px',
})

export interface ContextItemProps
  extends ComponentProps<typeof StyledContextItem> {}

export const ContextItem = forwardRef<
  ElementRef<typeof StyledContextItem>,
  ContextItemProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  const ChildVariant = isText(children) ? (
    <Text color="inherit">{children}</Text>
  ) : (
    children
  )

  return (
    <StyledContextItem ref={forwardedRef} {...remainingProps}>
      {ChildVariant}
    </StyledContextItem>
  )
})

ContextItem.displayName = 'ContextItem'
