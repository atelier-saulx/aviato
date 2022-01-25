import React, { forwardRef, ElementRef, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { Button } from '~/components/Input'

const StyledTab = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '64px',
})

const Indicator = styled('div', {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '3px',
  background: '$PrimaryMain',

  variants: {
    isActive: {
      true: {
        background: '$PrimaryMain',
      },
      false: {
        background: 'none',
      },
    },
  },
})

export interface TabProps extends ComponentProps<typeof StyledTab> {
  value?: string
  isActive?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Tab = forwardRef<ElementRef<typeof StyledTab>, TabProps>(
  (properties, forwardedRef) => {
    const {
      children,
      isActive = false,
      leftIcon = null,
      rightIcon = null,
      ...remainingProps
    } = properties

    return (
      <StyledTab ref={forwardedRef} {...remainingProps}>
        <Button
          type="ghost"
          variant="transparent"
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        >
          {children}
        </Button>

        <Indicator isActive={isActive} />
      </StyledTab>
    )
  }
)
