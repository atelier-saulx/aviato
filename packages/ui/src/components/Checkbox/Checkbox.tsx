import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { noop } from '@aviato/utils'
import { Conditional } from '~/components/Utilities/Conditional'
import { DefaultProps, styled } from '~/theme'
import { IconCheck, IconMinus } from '~/icons'
import { DefaultChangePayload } from '~/types/events'

const HiddenCheckbox = styled('input', {
  position: 'absolute',
  opacity: 0,
  cursor: 'pointer',

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
  },
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

export enum CHECKBOX_STATES {
  Unchecked = 'Unchecked',
  Checked = 'Checked',
  Indeterminate = 'Indeterminate',
}

export interface OnCheckboxChangePayload extends DefaultChangePayload {
  isChecked: boolean
}

export interface CheckboxProps extends DefaultProps {
  size?: CheckboxSize
  checked?: boolean
  disabled?: boolean
  hasCheckedChildren?: boolean
  onChange?: (payload: OnCheckboxChangePayload) => void
}

/***
 * TODO: Implement proper indeterminate logic
 */
export const Checkbox: FunctionComponent<CheckboxProps> = (
  properties: CheckboxProps
) => {
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
      if (isDisabled) return noop()

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
    <StyledCheckbox
      size={size}
      state={isChecked}
      disabled={isDisabled}
      {...remainingProps}
    >
      <HiddenCheckbox
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        size={size}
      />

      <Conditional test={isChecked && !hasIndeterminateState}>
        <IconCheck />
      </Conditional>

      <Conditional test={isChecked && hasIndeterminateState}>
        <IconMinus />
      </Conditional>
    </StyledCheckbox>
  )
}
