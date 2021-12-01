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
        backgroundColor: 'yellow',
      },
    },
  },
})

type CheckboxSize = 'small' | 'medium'
type CheckboxState = 'checked' | 'unchecked'
type CheckBoxDisabled = 'disabled'

export type CheckboxProps = {
  size?: CheckboxSize
  state?: CheckboxState
  disabled?: CheckBoxDisabled
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  size = 'medium',
}) => {
  const [isChecked, setIsChecked] = useState(false)

  let disabledBox = false
  let clickable = false

  if (isChecked && !disabledBox) {
    clickable = true
  }

  return (
    <CheckboxContainer>
      <StyledCheckbox
        onClick={() => setIsChecked(!isChecked)}
        size={size}
        state={isChecked ? 'checked' : 'unchecked'}
      >
        {clickable && <CheckedIcon />}
      </StyledCheckbox>
    </CheckboxContainer>
  )
}
