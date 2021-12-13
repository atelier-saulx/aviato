import React, { ElementRef, useCallback, useEffect, useState } from 'react'
import { noop } from '@aviato/utils'
import { Conditional } from '~/components/Utilities/Conditional'
import { DefaultProps, styled } from '~/theme'
import { ComponentProps } from '@stitches/react'
import { IconCheck, IconMinus } from '~/icons'
import { OnValueChange } from '~/types'

const HiddenCheckbox = styled('input', {
  position: 'absolute',
  opacity: 0,
  cursor: 'pointer',
  height: 0,
  width: 0,
})

const DIV_TAG = 'div'

const StyledCheckbox = styled(DIV_TAG, {
  backgroundColor: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  padding: '1px',
  border: '1px solid $OtherOutline',
  color: '$PrimaryContrastHigh',

  '&:hover': {
    backgroundColor: '$ActionMainHover',
  },

  variants: {
    size: {
      small: {
        width: '16px',
        height: '16px',
      },
      medium: {
        width: '20px',
        height: '20px',
      },
    },
    state: {
      true: {
        backgroundColor: '$PrimaryMain',

        '&:hover': {
          backgroundColor: '$PrimaryMainHover',
        },
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        backgroundColor: '$ActionDisabledBackground',

        '&:hover': {
          backgroundColor: '$ActionDisabledBackground',
        },
      },
    },
  },
})

export type CheckboxSize = 'small' | 'medium'

export interface CheckboxProps extends DefaultProps {
  size?: CheckboxSize
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  onChange?: OnValueChange<boolean>
}

type ForwardProps = ComponentProps<typeof StyledCheckbox> & CheckboxProps

export const Checkbox = React.forwardRef<
  ElementRef<typeof DIV_TAG>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    size = 'medium',
    checked = false,
    disabled = false,
    indeterminate = false,
    onChange = noop,
    ...remainingProps
  } = properties

  const [isChecked, setIsChecked] = useState(checked)
  const [isDisabled, setIsDisbled] = useState(disabled)
  const [isIndeterminate, setIsIndeterminate] = useState(indeterminate)

  useEffect(() => {
    setIsChecked(checked)
    setIsDisbled(disabled)
    setIsIndeterminate(indeterminate)
  }, [checked, disabled, indeterminate])

  const handleClick = useCallback(() => {
    if (disabled) return noop()

    const newState = !isChecked
    setIsChecked(newState)
    onChange(newState)
  }, [isChecked, isDisabled, isIndeterminate])

  const handleChange = useCallback(() => {
    if (disabled) return noop()

    const newState = !isChecked
    setIsChecked(newState)
    onChange(newState)
  }, [isChecked, isDisabled, isIndeterminate])

  return (
    <StyledCheckbox
      ref={forwardedRef}
      onClick={handleClick}
      size={size}
      state={isChecked}
      disabled={isDisabled}
      {...remainingProps}
    >
      <HiddenCheckbox
        type="checkbox"
        checked={indeterminate || checked}
        onChange={handleChange}
        disabled={disabled}
      />

      <Conditional test={isChecked && !isIndeterminate}>
        <IconCheck />
      </Conditional>

      <Conditional test={isChecked && isIndeterminate}>
        <IconMinus />
      </Conditional>
    </StyledCheckbox>
  )
})
