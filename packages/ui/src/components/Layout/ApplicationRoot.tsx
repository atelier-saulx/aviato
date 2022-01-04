import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'

const StyledApplicationRoot = styled('div', {
  position: 'relative',
  display: 'flex',
  width: '100vw',
  height: '100vh',
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
