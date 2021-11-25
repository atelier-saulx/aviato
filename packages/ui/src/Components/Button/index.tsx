import React, { FunctionComponent } from 'react'
import { styled } from '../../theme'

export type ButtonProps = {
  text?: string
}

const StyledButton = styled('button', {
  backgroundColor: '$primary',
  alignItems: 'flex-start',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '500',
  lineHeight: '24px',
  margin: '6px',
  padding: '4px 12px',
})

export const Button: FunctionComponent<ButtonProps> = ({ text, children }) => {
  return (
    <div>
      <StyledButton>{text ?? children}</StyledButton>
    </div>
  )
}
