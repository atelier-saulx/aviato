import React, {
  CSSProperties,
  ElementRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { noop } from '@aviato/utils'
import { Conditional } from '~/components/Utilities/Conditional'
import { styled, CSS } from '~/theme'
import { CheckedIcon, IndeterminateIcon } from './temp'

const StyledCheckbox = styled('div', {
  backgroundColor: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '20px',
  height: '20px',
  padding: '1px',
  border: '1px solid $OtherOutline',

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
        backgroundColor: '$ActionDisabledBackground !important',
        cursor: 'not-allowed',

        '&:hover': {
          backgroundColor: '$ActionDisabledContent',
        },
      },
    },
  },
})

export type CheckboxSize = 'small' | 'medium'

export type CheckboxProps = {
  size?: CheckboxSize
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  css?: CSS
  style?: CSSProperties
}

export const Checkbox = React.forwardRef<
  ElementRef<typeof StyledCheckbox>,
  CheckboxProps
>((properties, forwardedRef) => {
  const {
    size = 'medium',
    checked = false,
    disabled = false,
    indeterminate = false,
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

    setIsChecked(!isChecked)
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
      <Conditional test={isChecked && isIndeterminate}>
        <IndeterminateIcon size={size} />
      </Conditional>

      <Conditional test={isChecked && !isIndeterminate}>
        <CheckedIcon size={size} />
      </Conditional>
    </StyledCheckbox>
  )
})
