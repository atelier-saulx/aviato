import React, { ElementRef, useCallback, BaseSyntheticEvent } from 'react'
import { ComponentProps } from '@stitches/react'
import { classNames, styled } from '~/theme'
import { Conditional } from '~/components/Utilities'
import { InputType, InputVariant } from './types'
import { DefaultChangePayload } from '~/types'
import { noop } from '@aviato/utils'

/**
 * NOTICE
 *
 * This is an internal component.
 * It's not meant to be used by itself.
 */

const BaseInputWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  borderRadius: '4px',

  '&::after': {
    content: `''`,
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    pointerEvents: 'none',
    borderRadius: '4px',
  },

  '&.isDisabled': {
    background: '$OtherDisabledBackground',

    '&::after': {
      border: '1px solid $OtherDisabledOutline',
    },
  },

  '&.isInvalid': {
    '&::after': {
      border: '1px solid $ErrorOutline',
    },
  },

  variants: {
    variant: {
      outlined: {
        '&::after': {
          border: '1px solid $OtherInputBorderDefault',
        },

        '&:hover': {
          '&::after': {
            border: '1px solid $OtherInputBorderHover',
          },

          '&.isActive': {
            '&::after': {
              border: '2px solid $OtherInputBorderActive',
            },
          },
        },

        '&.isActive': {
          '&::after': {
            border: '2px solid $OtherInputBorderActive',
          },
        },
      },

      filled: {
        '&::after': {
          border: '1px solid transparent',
        },

        '&:not(.isActive):not(.isDisabled)': {
          background: '$ActionMain',

          '&:hover': {
            background: '$ActionMainHover',
          },
        },

        '&.isActive': {
          '&::after': {
            border: '2px solid $OtherInputBorderActive',
          },
        },

        '&:hover': {
          '&.isActive': {
            '&::after': {
              border: '2px solid $OtherInputBorderActive',
            },
          },
        },
      },

      unstyled: {
        '&.isDisabled': {
          background: 'none',
          border: '1px solid transparent',
        },
      },
    },
  },
})

export const StyledInput = styled('input', {
  position: 'relative',
  display: 'block',
  height: '36px',
  minHeight: '36px',
  lineHeight: '1.55',
  fontSize: '15px',
  width: '100%',
  minWidth: '0px',
  textAlign: 'left',
  paddingLeft: '12px',
  color: '$TextPrimary',
  background: 'transparent',

  '&:disabled': {
    background: 'transparent',
    color: '$OtherDisabledContent',

    '&::placeholder': {
      color: '$OtherDisabledContent',
    },
  },

  '&::placeholder': {
    color: '$TextSecondary',
  },

  '&.hasLeftIcon': {
    paddingLeft: '32px',
  },

  '&.hasRightIcon': {
    paddingRight: '32px',
  },
})

const IconWrapper = styled('span', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  width: '36px',
  height: '36px',
  zIndex: 1,
  color: '$TextSecondary',

  '&.isActive': {
    color: '$TextPrimary',
  },

  '&.isDisabled': {
    color: '$OtherDisabledContent',
  },

  variants: {
    type: {
      start: {
        left: 0,
      },
      end: {
        right: 0,
      },
    },
  },
})

export interface OnInputChangePayload extends DefaultChangePayload {
  value: string
}

export interface BaseInputProps {
  component?: React.ElementType
  type?: InputType
  placeholder?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: InputVariant
  disabled?: boolean
  invalid?: boolean
  multiline?: boolean
  maxRows?: number
  minRows?: number
  onChange?: (payload: OnInputChangePayload) => void
}

type ForwardProps = ComponentProps<typeof StyledInput> & BaseInputProps

export const BaseInput = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    component = 'input',
    leftIcon = null,
    rightIcon = null,
    variant = 'outlined',
    disabled: isDisabled = false,
    invalid: isInvalid = false,
    onChange = noop,
    ...remainingProps
  } = properties

  const [isActive, setIsActive] = React.useState(false)
  const hasLeftIcon = Boolean(leftIcon)
  const hasRightIcon = Boolean(rightIcon)

  const classes = classNames({
    hasLeftIcon,
    hasRightIcon,
    isActive,
    isDisabled,
    isInvalid,
  })

  const handleChange = useCallback((event: BaseSyntheticEvent) => {
    onChange({ value: event.target.value, event })
  }, [])

  return (
    <BaseInputWrapper variant={variant} className={classes}>
      <Conditional test={leftIcon}>
        <IconWrapper type="start" className={classes}>
          {leftIcon}
        </IconWrapper>
      </Conditional>

      <StyledInput
        as={component}
        ref={forwardedRef}
        className={classes}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        disabled={isDisabled}
        onChange={handleChange}
        {...remainingProps}
      />

      <Conditional test={rightIcon}>
        <IconWrapper type="end" className={classes}>
          {rightIcon}
        </IconWrapper>
      </Conditional>
    </BaseInputWrapper>
  )
})
