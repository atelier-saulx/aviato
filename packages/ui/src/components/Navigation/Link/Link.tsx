import React, { forwardRef, ElementRef, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { Text } from '~/components'

const StyledLink = styled('a', {})

export interface LinkProps extends ComponentProps<typeof StyledLink> {
  children: ReactNode
}

export const Link = forwardRef<ElementRef<typeof StyledLink>, LinkProps>(
  (properties, forwardedRef) => {
    const { children, ...remainingProps } = properties

    return (
      <StyledLink ref={forwardedRef} {...remainingProps}>
        <Text color="Primary">{children}</Text>
      </StyledLink>
    )
  }
)
