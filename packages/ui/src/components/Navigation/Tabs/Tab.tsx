import React, {
  forwardRef,
  ElementRef,
  ReactNode,
  useCallback,
  MouseEventHandler,
} from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { Button } from '~/components/Input'
import { noop } from '@aviato/utils'

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
  disabled?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
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
      onClick = noop,
      ...remainingProps
    } = properties

    const handleClick = useCallback(
      (event) => {
        if (disabled) {
          return noop()
        }

        return onClick(event)
      },
      [disabled]
    )

    return (
      <StyledTab
        role="tab"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        ref={forwardedRef}
        {...remainingProps}
      >
        <Button
          mode="ghost"
          variant="transparent"
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          disabled={disabled}
          onClick={(event) => handleClick(event)}
        >
          {children}
        </Button>

        <Indicator isActive={isActive} />
      </StyledTab>
    )
  }
)

Tab.displayName = 'Tab'
