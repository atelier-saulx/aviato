import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'

export const headerHeight = '60px'

const StyledHeader = styled('div', {
  position: 'fixed',
  left: '0',
  right: '0',
  top: '0',
  height: headerHeight,
  zIndex: '6',
  display: 'flex',
  justifyContent: 'end',
  paddingRight: '$sm',
  borderBottom: '1px solid $OtherDivider',
  backgroundColor: '$Background2dp',
})

export interface HeaderProps extends ComponentProps<typeof StyledHeader> {}

export const Header = forwardRef<ElementRef<typeof StyledHeader>, HeaderProps>(
  (properties, forwardedRef) => {
    const { children, ...remainingProps } = properties

    return (
      <StyledHeader ref={forwardedRef} {...remainingProps}>
        {children}
      </StyledHeader>
    )
  }
)
