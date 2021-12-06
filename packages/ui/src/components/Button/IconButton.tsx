import { styled } from '~/theme'
import React, { FunctionComponent, MouseEventHandler, useCallback } from 'react'
import { noop } from '@aviato/utils'
import { PlusIcon } from './temp'

const StyledIconButton = styled('button', {
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  borderRadius: '4px',
  cursor: 'pointer',
  height: '32px',
  width: '32px',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  variants: {
    type: {
      filled: {
        color: '$PrimaryContrastHigh',
        background: '$PrimaryMain',
        border: '1px solid $PrimaryMain',

        '&:hover': {
          background: '$PrimaryMainHover',
        },
        '&:active': {
          background: '$PrimaryMainSelected',
        },
        '&:disabled': {
          color: '$ActionDisabledContent',
          background: '$ActionDisabledBackground',
          border: '1px transparent $ActionDisabledBackground',
          '& svg': {
            fill: '$ActionDisabledContent',
          },
        },
        '& svg': {
          fill: '$PrimaryContrastHigh',
        },
      },

      outlined: {
        border: '1px solid $PrimaryOutlineBorder',
        color: '$PrimaryMain',

        '&:hover': {
          backgroundColor: '$PrimaryLightHover',
        },
        '&:active': {
          background: '$PrimaryLightSelected',
        },
        '&:disabled': {
          color: '$ActionDisabledContent',
          border: '1px solid $ActionDisabledBackground',
          background: 'none',
          '& svg': {
            fill: '$ActionDisabledContent',
          },
        },
        '& svg': {
          fill: '$PrimaryMain',
        },
      },

      transparent: {
        border: '1px solid transparent',
        color: '$PrimaryMain',

        '&:hover': {
          backgroundColor: '$PrimaryLightHover',
        },
        '&:active': {
          background: '$PrimaryLightSelected',
        },
        '&:disabled': {
          color: '$ActionDisabledContent',
          background: 'none',
          '& svg': {
            fill: '$ActionDisabledContent',
          },
        },
        // TODO: normalise icon color props
        '& svg': {
          fill: '$PrimaryMain',
        },
      },
    },
  },
})

type IconButtonVariant = 'filled' | 'outlined' | 'transparent'

export type IconButtonProps = {
  variant?: IconButtonVariant
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  icon?: string
}

export const IconButton: FunctionComponent<IconButtonProps> = ({
  variant = 'filled',
  disabled = false,
  onClick = noop,
}) => {
  const handleClick = useCallback(() => {
    onClick()
  }, [])

  return (
    <StyledIconButton type={variant} disabled={disabled} onClick={handleClick}>
      <PlusIcon />
    </StyledIconButton>
  )
}
