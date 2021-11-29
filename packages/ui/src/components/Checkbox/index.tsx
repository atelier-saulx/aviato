import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const CheckboxContainer = styled('div', {
  display: 'inline-block',
  verticalAlign: 'middle',
  margin: '6px',
})

/* Temporary Icon */
const Icon = styled('svg', {
  fill: 'none',
  stroke: 'white',
  strokeWidth: '3px',
})

const StyledCheckbox = styled('div', {
  backgroundColor: '$primary',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '20px',
  height: '20px',
  padding: '2px',
  boxSizing: 'border-box',
  border: '1px solid $primary',

  variants: {
    type: {
      light: {
        backgroundColor: '#f9f9f9',
        border: '1px solid rgba(15,16,19,0.06)',
      },
      medium: {
        backgroundColor: 'rgba(15,16,19,0.06)',
        border: '1px solid rgba(15,16,19,0.12)',
      },
      primary: {
        backgroundColor: '$primary',
        border: '1px solid $primary',
      },
      secondary: {
        backgroundColor: 'rgba(15,16,19,0.12)',
        border: '1px solid rgba(15,16,19,0.26)',
      },
    },
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

type CheckboxVariant = 'light' | 'medium' | 'primary' | 'secondary'
type CheckboxSize = 'small' | 'medium'

export type CheckboxProps = {
  variant?: CheckboxVariant
  size?: CheckboxSize
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  variant = 'light',
  size = 'medium',
}) => {
  return (
    <CheckboxContainer>
      <StyledCheckbox type={variant} size={size}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}
