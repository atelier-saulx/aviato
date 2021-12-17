import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { noop } from '@aviato/utils'
import { DefaultProps, styled } from '~/theme'
import { DefaultChangePayload } from '~/types/events'

export type SwitchSize = 'normal' | 'large'

interface SwitchStyles {
  switch: {
    width: number
    height: number
  }
  knob: {
    size: number
  }
  offset: {
    value: number
  }
}

const SwitchSizeMap: {
  [key in SwitchSize]: SwitchStyles
} = {
  normal: {
    switch: {
      width: 32,
      height: 20,
    },
    knob: {
      size: 16,
    },
    offset: {
      value: 2,
    },
  },

  large: {
    switch: {
      width: 32 * 1.3,
      height: 20 * 1.3,
    },
    knob: {
      size: 16 * 1.3,
    },
    offset: {
      value: 2 * 1.3,
    },
  },
}

const normalSize = SwitchSizeMap.normal
const largeSize = SwitchSizeMap.large

const StyledSwitch = styled('input', {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  border: '1px solid $OtherOutline',
  backgroundColor: '$OtherInputBorderDefault',

  '&:hover': {
    '&:not([disabled])': {
      backgroundColor: '$PrimaryLightHover',
    },
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&::before': {
    content: `''`,
    display: 'block',
    backgroundColor: '#FFF',
  },

  '&:checked': {
    backgroundColor: '$PrimaryMain',

    '&:hover': {
      '&:not([disabled])': {
        backgroundColor: '$PrimaryMainHover',
      },
    },
  },

  variants: {
    size: {
      normal: {
        width: normalSize.switch.width,
        height: normalSize.switch.height,
        borderRadius: normalSize.switch.height / 2,

        '&::before': {
          width: normalSize.knob.size,
          height: normalSize.knob.size,
          borderRadius: normalSize.knob.size / 2,
          transform: `translateX(${normalSize.offset.value}px)`,
        },

        '&:checked': {
          '&::before': {
            transform: `translateX(${
              normalSize.knob.size - normalSize.offset.value
            }px)`,
          },
        },
      },

      large: {
        width: largeSize.switch.width,
        height: largeSize.switch.height,
        borderRadius: largeSize.switch.height / 2,

        '&::before': {
          width: largeSize.knob.size,
          height: largeSize.knob.size,
          borderRadius: largeSize.knob.size / 2,
          transform: `translateX(${largeSize.offset.value}px)`,
        },

        '&:checked': {
          '&::before': {
            transform: `translateX(${
              largeSize.knob.size - largeSize.offset.value
            }px)`,
          },
        },
      },
    },
  },
})

export interface OnSwitchChangePayload extends DefaultChangePayload {
  isChecked: boolean
}

export interface SwitchProps extends DefaultProps {
  size?: SwitchSize
  checked?: boolean
  disabled?: boolean
  onChange?: (payload: OnSwitchChangePayload) => void
}

export const Switch: FunctionComponent<SwitchProps> = (properties) => {
  const {
    size = 'normal',
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
      size={size}
      checked={isChecked}
      onChange={handleChange}
      disabled={isDisabled}
      {...remainingProps}
    />
  )
}
