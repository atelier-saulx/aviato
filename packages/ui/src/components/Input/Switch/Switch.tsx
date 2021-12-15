import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { noop } from '@aviato/utils'
import { DefaultProps, styled } from '~/theme'
import { DefaultChangePayload } from '~/types/events'

const StyledSwitch = styled('input', {
  cursor: 'pointer',
  padding: '1px',
  border: '1px solid $OtherOutline',
  color: '$PrimaryContrastHigh',
  backgroundColor: '$ActionDisabledBackground',

  width: 32,
  height: 20,
  borderRadius: 20 / 2,

  '&:hover': {
    '&:not([disabled])': {
      backgroundColor: '$ActionMainHover',
    },
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&::before': {
    content: `''`,
    display: 'block',
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: '#FFF',
    transform: 'translateX(0px)',
  },

  '&:checked': {
    backgroundColor: '$PrimaryMain',

    '&:hover': {
      '&:not([disabled])': {
        backgroundColor: '$PrimaryMainHover',
      },
    },

    '&::before': {
      transform: 'translateX(calc(100% - 4px))',
    },
  },
})

export interface OnSwitchChangePayload extends DefaultChangePayload {
  isChecked: boolean
}

export interface SwitchProps extends DefaultProps {
  checked?: boolean
  disabled?: boolean
  onChange?: (payload: OnSwitchChangePayload) => void
}

export const Switch: FunctionComponent<SwitchProps> = (properties) => {
  const {
    checked = false,
    disabled = false,
    onChange = noop,
    ...remainingProps
  } = properties

  const [isDisabled, setIsDisbled] = useState(disabled)
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    setIsDisbled(disabled)
    setIsChecked(checked)
  }, [checked, disabled])

  const handleChange = useCallback(
    (event) => {
      if (isDisabled) {
        return noop()
      }

      const isSwitchChecked = !isChecked
      setIsChecked(isSwitchChecked)

      onChange({
        isChecked: isSwitchChecked,
        isDisabled,
        event,
      })
    },
    [isChecked]
  )

  return (
    <StyledSwitch
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      disabled={isDisabled}
      {...remainingProps}
    />
  )
}
