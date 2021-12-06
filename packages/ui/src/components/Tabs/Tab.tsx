import React, { ElementRef, MouseEventHandler, useCallback } from 'react'
import { css, DefaultProps, styled } from '~/theme'
import { noop } from '@aviato/utils'

const TabStyles = css({
  borderRadius: '4px',
  fontWeight: '500',
  display: 'inline',
  lineHeight: '24px',
  height: '32px',
  padding: '8px 8px',
  fontSize: '15px',
  letterSpacing: '-1.5%',
  '&:hover': {
    backgroundColor: '$ActionMainHover',
  },

  variants: {
    disabled: {
      true: {
        '&:hover': {
          backgroundColor: 'transparent !important',
        },
      },
    },
  },
})

const TabUnderlineStyles = css({
  height: '60px',
  alignItems: 'flex-start',
  cursor: 'pointer',
  borderBottom: '3px solid transparent',
  '&:hover': {
    [`& .${TabStyles}`]: {
      backgroundColor: '$ActionMainHover',
    },
  },

  '&:disabled': {
    color: '$TextDisabled',
    cursor: 'default',
    '&:hover': {
      [`& .${TabStyles}`]: {
        backgroundColor: 'transparent',
      },
    },
  },

  variants: {
    isActive: {
      true: {
        borderBottom: '3px solid $PrimaryMain',
      },
    },
  },
})

const StyledUnderline = styled('button', TabUnderlineStyles)
const StyledTab = styled('div', TabStyles)

export type TabProps = DefaultProps & {
  disabled?: boolean
  isActive?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Tab = React.forwardRef<
  ElementRef<typeof StyledUnderline>,
  TabProps
>((properties, forwardedRef) => {
  const {
    disabled = false,
    isActive = false,
    onClick = noop,
    children,
    ...remainingProps
  } = properties

  const handleClick = useCallback(() => {
    onClick()
  }, [])

  return (
    <StyledUnderline ref={forwardedRef} disabled={disabled} isActive={isActive}>
      <StyledTab disabled={disabled} onClick={handleClick} {...remainingProps}>
        {children}
      </StyledTab>
    </StyledUnderline>
  )
})
