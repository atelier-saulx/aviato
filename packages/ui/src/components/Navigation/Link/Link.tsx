import React, { forwardRef, ElementRef, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'

import { StitchedCSS, styled } from '~/theme'
import { Conditional, IconExternalLink, Text } from '~/components'

const StyledLink = styled('a', {
  color: '$TextPrimary',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const LinkCSS: StitchedCSS = {
  position: 'relative',

  '&:hover': {
    '&::before': {
      content: `''`,
      display: 'block',
      backgroundColor: 'currentColor',
      position: 'absolute',
      width: '100%',
      height: 1,
      bottom: 2,
    },
  },
}

const IconContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  width: 16,
  height: 16,
  marginLeft: 6,
  cursor: 'pointer',
  color: 'inherit',
})

export interface LinkProps extends ComponentProps<typeof StyledLink> {
  children: ReactNode
  useIcon?: boolean
  icon?: ReactNode
}

export const Link = forwardRef<ElementRef<typeof StyledLink>, LinkProps>(
  (properties, forwardedRef) => {
    const {
      icon = <IconExternalLink />,
      useIcon = false,
      children,
      ...remainingProps
    } = properties

    return (
      <StyledLink ref={forwardedRef} {...remainingProps}>
        <Text color="Inherit" css={LinkCSS}>
          {children}
        </Text>

        <Conditional test={useIcon}>
          <IconContainer>{icon}</IconContainer>
        </Conditional>
      </StyledLink>
    )
  }
)
