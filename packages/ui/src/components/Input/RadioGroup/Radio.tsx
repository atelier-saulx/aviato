import React, { FunctionComponent } from 'react'
import { DefaultProps, styled } from '~/theme'

const StyledRadioLabel = styled('label', {})

const StyledRadio = styled('input', {
  width: 20,
  height: 20,
})

export interface RadioProps extends DefaultProps {
  value: string
  disabled?: boolean
}

export const Radio: FunctionComponent<RadioProps> = (properties) => {
  const { value, disabled = false, children, ...remainingProps } = properties

  return (
    <StyledRadioLabel>
      <StyledRadio
        type="radio"
        value={value}
        disabled={disabled}
        {...remainingProps}
      />
      <span>{children}</span>
    </StyledRadioLabel>
  )
}
