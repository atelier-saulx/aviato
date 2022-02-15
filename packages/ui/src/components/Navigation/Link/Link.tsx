import React, { forwardRef, ElementRef, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { Text } from '~/components/Text'
import { IconExternalLink } from '~/components/Icons/components'
import { Conditional } from '~/components/Utilities/Conditional'

const StyledLink = styled('a', {
  position: 'relative',
  color: '$TextPrimary',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const UnderlinedText = styled(Text, {
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

  variants: {
    underline: {
      true: {
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
    },
  },
})

const IconContainer = styled('div', {
  width: 16,
  height: 16,
  marginLeft: 6,
  cursor: 'pointer',
  color: '$TextPrimary',
})

export interface LinkProps extends ComponentProps<typeof StyledLink> {
  children: ReactNode
  useIcon?: boolean
  underline?: boolean
  icon?: ReactNode
}

export const Link = forwardRef<ElementRef<typeof StyledLink>, LinkProps>(
  (properties, forwardedRef) => {
    const {
      icon = <IconExternalLink />,
      useIcon = false,
      underline = false,
      children,
      ...remainingProps
    } = properties

    return (
      <StyledLink ref={forwardedRef} {...remainingProps}>
        <UnderlinedText color="inherit" underline={underline}>
          {children}
        </UnderlinedText>

        <Conditional test={useIcon}>
          <IconContainer>{icon}</IconContainer>
        </Conditional>
      </StyledLink>
    )
  }
)

Link.displayName = 'Link'
