import React, {
  ElementRef,
  BaseSyntheticEvent,
  ElementType,
  ReactNode,
  forwardRef,
  useState,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { useUncontrolled, useUuid } from '~/hooks'
import { classNames, styled } from '~/theme'
import { Conditional } from '~/components/Utilities'
import { onChange } from '~/types'
import { InputType, InputVariant } from './types'

/**
 * NOTICE
 *
 * This is an internal component.
 * It's not meant to be used by itself.
 */

const Container = styled('div', {
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
      border: '2px solid $ErrorMainOutline',
    },

    '&:hover': {
      '&::after': {
        border: '2px solid $ErrorMainOutline',
      },

      '&.isActive': {
        '&::after': {
          border: '2px solid $ErrorMainOutline',
        },
      },
    },

    '&.isActive': {
      '&::after': {
        border: '2px solid $ErrorMainOutline',
      },
    },
  },

  variants: {
    variant: {
      outline: {
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
          background: '$ActionLight',

          '&:hover': {
            background: '$ActionLightHover',
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
    },
  },
})

export const StyledInput = styled('input', {
  position: 'relative',
  display: 'block',
  height: '36px',
  minHeight: '36px',
  width: '100%',
  minWidth: '0px',
  textAlign: 'left',
  paddingLeft: '12px',
  background: 'transparent',
  lineHeight: '$md',
  fontSize: '$md',
  color: '$TextPrimary',
  userSelect: 'text',

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

const IconContainer = styled('span', {
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

export interface OnInputChange extends onChange {
  value: string
}

type StitchedProps = Omit<ComponentProps<typeof StyledInput>, 'onChange'>

export interface BaseInputProps extends StitchedProps {
  value?: string
  defaultValue?: string
  component?: ElementType
  type?: InputType
  placeholder?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  variant?: InputVariant
  disabled?: boolean
  invalid?: boolean
  multiline?: boolean
  maxRows?: number
  minRows?: number
  onChange?: (value: string, payload: OnInputChange) => void
  autoFocus?: boolean
}

export const BaseInput = forwardRef<
  ElementRef<typeof StyledInput>,
  BaseInputProps
>((properties, forwardedRef) => {
  const {
    value,
    defaultValue,
    component = 'input',
    leftIcon = null,
    rightIcon = null,
    variant = 'outline',
    disabled: isDisabled = false,
    invalid: isInvalid = false,
    onChange = noop,
    ...remainingProps
  } = properties

  const uuid = useUuid({ prefix: 'input' })

  const [inputValue, setInputValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: '',
    rule: (value) => typeof value === 'string',
  })

  const [isActive, setIsActive] = useState(false)
  const hasLeftIcon = Boolean(leftIcon)
  const hasRightIcon = Boolean(rightIcon)

  const classes = classNames({
    hasLeftIcon,
    hasRightIcon,
    isActive,
    isDisabled,
    isInvalid,
  })

  const handleChange = (event: BaseSyntheticEvent) => {
    const { value } = event?.target ?? {}

    setInputValue(value)
    onChange(value, { value, event })
  }

  return (
    <Container variant={variant} className={classes}>
      <Conditional test={leftIcon}>
        <IconContainer type="start" className={classes}>
          {leftIcon}
        </IconContainer>
      </Conditional>

      <StyledInput
        as={component}
        ref={forwardedRef}
        id={uuid}
        className={classes}
        value={inputValue}
        onInput={handleChange}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        disabled={isDisabled}
        {...remainingProps}
      />

      <Conditional test={rightIcon}>
        <IconContainer type="end" className={classes}>
          {rightIcon}
        </IconContainer>
      </Conditional>
    </Container>
  )
})

BaseInput.displayName = 'BaseInput'
