import React, { FunctionComponent, useState } from 'react'
import { styled } from '~/theme'
import { CheckedIcon } from './temp'

const CheckboxContainer = styled('div', {
  verticalAlign: 'middle',
  margin: '6px',
})

const StyledCheckbox = styled('div', {
  backgroundColor: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '20px',
  height: '20px',
  padding: '1px',
  boxSizing: 'border-box',
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
      checked: {
        backgroundColor: '$PrimaryMain',
        '&:hover': {
          backgroundColor: '$PrimaryMainHover',
        },
      },
      unchecked: {},
    },
    disabled: {
      disabled: {
        backgroundColor: '$ActionDisabledBackground !important',
        cursor: 'not-allowed',
        '&:hover': {
          backgroundColor: '$ActionDisabledContent',
        },
      },
      enabled: {},
    },
  },
})

type CheckboxSize = 'small' | 'medium'
type CheckboxState = 'checked' | 'unchecked'
type CheckboxEnabled = 'disabled' | 'enabled'

export type CheckboxProps = {
  size?: CheckboxSize
  state?: CheckboxState
  disabled?: CheckboxEnabled
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  size = 'medium',
  disabled = 'enabled',
}) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <CheckboxContainer>
      <StyledCheckbox
        onClick={() => setIsChecked(!isChecked)}
        size={size}
        state={isChecked ? 'checked' : 'unchecked'}
        disabled={disabled}
      >
        {isChecked && <CheckedIcon />}
      </StyledCheckbox>
    </CheckboxContainer>
  )
}
