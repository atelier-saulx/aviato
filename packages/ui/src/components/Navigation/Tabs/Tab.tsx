import React, {
  forwardRef,
  ElementRef,
  MouseEventHandler,
  ReactElement,
} from 'react'
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
  background: '$ActionMain',

  variants: {
    isActive: {
      true: {
        background: '$ActionMain',
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
  disabled?: boolean
  leftIcon?: ReactElement
  rightIcon?: ReactElement
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const Tab = forwardRef<ElementRef<typeof StyledTab>, TabProps>(
  (properties, forwardedRef) => {
    const {
      children,
      isActive = false,
      leftIcon = null,
      rightIcon = null,
      disabled = false,
      ...remainingProps
    } = properties

    return (
      <StyledTab
        role="tab"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        ref={forwardedRef}
        {...remainingProps}
      >
        <Button
          color="action"
          variant="ghost"
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          disabled={disabled}
        >
          {children}
        </Button>

        <Indicator isActive={isActive} />
      </StyledTab>
    )
  }
)

Tab.displayName = 'Tab'
