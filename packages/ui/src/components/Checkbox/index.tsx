import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Conditional } from '~/components/Utilities/Conditional'
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

type CheckboxSize = 'small' | 'medium'

export type CheckboxProps = {
  size?: CheckboxSize
  checked?: boolean
  disabled?: boolean
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  size = 'medium',
  checked = false,
  disabled = false,
}) => {
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const handleClick = useCallback(() => {
    if (!disabled) return setIsChecked(!isChecked)
  }, [isChecked])

  return (
    <CheckboxContainer>
      <StyledCheckbox
        onClick={handleClick}
        size={size}
        state={isChecked}
        disabled={disabled}
      >
        <Conditional test={isChecked}>
          <CheckedIcon size={size} />
        </Conditional>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}
