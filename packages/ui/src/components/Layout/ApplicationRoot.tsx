import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'

const StyledApplicationRoot = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  overflowX: 'hidden',
  overflowY: 'hidden',
  backgroundColor: '$Background2dp',
})

export type ApplicationRootProps = {}

type ForwardProps = ComponentProps<typeof StyledApplicationRoot> &
  ApplicationRootProps

export const ApplicationRoot = React.forwardRef<
  ElementRef<typeof StyledApplicationRoot>,
  ForwardProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledApplicationRoot ref={forwardedRef} {...remainingProps}>
      {children}
    </StyledApplicationRoot>
  )
})
