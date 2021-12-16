import React, { ElementRef, useCallback, useEffect, useState } from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { styled } from '~/theme'
import { Conditional } from '~/components/Utilities/Conditional'
import { IconCheck, IconMinus } from '~/icons'
import { DefaultChangePayload } from '~/types/events'

const StyledCheckboxWrapper = styled('div', {
  position: 'relative',
})

const StyledCheckbox = styled('input', {
  cursor: 'pointer',
  appearance: 'none',
  padding: 0,
  outline: 0,
  display: 'block',
  overflow: 'visible',
  border: '1px solid $OtherInputBorderDefault',
  background: 'transparent',
  borderRadius: '4px',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:checked': {
    border: '1px solid $PrimaryMain',
    backgroundColor: '$PrimaryMain',

    '&:disabled': {
      border: '1px solid $OtherDisabledOutline',
      backgroundColor: '$OtherDisabledBackground',
    },
  },

  variants: {
    size: {
      small: {
        width: '16px',
        height: '16px',

        '& svg': {
          width: '12px',
          height: '12px',
        },
      },

      medium: {
        width: '20px',
        height: '20px',
      },
    },
  },
})

const StyledIconWrapper = styled('div', {
  position: 'absolute',
  zIndex: '1',
  top: '0',
  left: '0',
  pointerEvents: 'none',
  color: '$PrimaryMainContrast',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    size: {
      small: {
        width: '16px',
        height: '16px',

        '& svg': {
          width: '12px',
          height: '12px',
        },
      },

      medium: {
        width: '20px',
        height: '20px',
      },
    },
  },
})

export type CheckboxSize = 'small' | 'medium'

export enum CHECKBOX_STATES {
  Unchecked = 'Unchecked',
  Checked = 'Checked',
  Indeterminate = 'Indeterminate',
}

export interface OnCheckboxChangePayload extends DefaultChangePayload {
  isChecked: boolean
}

export interface CheckboxProps {
  size?: CheckboxSize
  checked?: boolean
  disabled?: boolean
  hasCheckedChildren?: boolean
  onChange?: (payload: OnCheckboxChangePayload) => void
}

type ForwardProps = ComponentProps<typeof StyledCheckboxWrapper> & CheckboxProps

/***
 * TODO: Implement proper indeterminate logic
 */

export const Checkbox = React.forwardRef<
  ElementRef<typeof StyledCheckboxWrapper>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    size = 'medium',
    checked = false,
    disabled = false,
    onChange = noop,
    ...remainingProps
  } = properties

  const [isDisabled, setIsDisbled] = useState(disabled)
  const [isChecked, setIsChecked] = useState(false)
  const [hasIndeterminateState] = useState(false)

  const [checkboxState, setCheckboxState] = useState(CHECKBOX_STATES.Unchecked)

  useEffect(() => {
    setIsDisbled(disabled)
    setIsChecked(checked)
  }, [checked, disabled])

  const handleChange = useCallback(
    (event) => {
      if (isDisabled) {
        return noop()
      }

      const isCheckboxChecked = !isChecked
      setIsChecked(isCheckboxChecked)

      const newCheckboxState = isCheckboxChecked
        ? CHECKBOX_STATES.Checked
        : CHECKBOX_STATES.Unchecked

      setCheckboxState(newCheckboxState)

      onChange({
        isChecked: isCheckboxChecked,
        isDisabled,
        checkboxState,
        event,
      })
    },
    [isChecked]
  )

  return (
    <>
      <StyledCheckboxWrapper ref={forwardedRef} {...remainingProps}>
        <StyledCheckbox
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          size={size}
        />

        <StyledIconWrapper size={size}>
          <Conditional test={isChecked && !hasIndeterminateState}>
            <IconCheck />
          </Conditional>

          <Conditional test={isChecked && hasIndeterminateState}>
            <IconMinus />
          </Conditional>
        </StyledIconWrapper>
      </StyledCheckboxWrapper>
    </>
  )
})
