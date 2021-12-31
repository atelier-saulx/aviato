import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'

import { Conditional } from '~/components/Utilities'
import { IconError } from '~/icons'

const StyledInputWrapper = styled('div', {
  width: '100%',
})

const Label = styled('label', {
  fontSize: 15,
  lineHeight: '32px',
})

const ErrorWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 8,
})

const IconWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '24px',
  color: '$ErrorMain',
  marginRight: 8,
})

const Error = styled('div', {
  fontSize: 15,
  lineHeight: '24px',
  color: '$ErrorMain',
})

export interface InputWrapperProps {
  label?: string
  error?: string
}

type ForwardProps = ComponentProps<typeof StyledInputWrapper> &
  InputWrapperProps

export const InputWrapper = React.forwardRef<
  ElementRef<typeof StyledInputWrapper>,
  ForwardProps
>((properties, forwardRef) => {
  const { label, error, children, ...remainingProps } = properties

  return (
    <StyledInputWrapper {...remainingProps} ref={forwardRef}>
      <Conditional test={label}>
        <Label>{label}</Label>
      </Conditional>

      {children}

      <Conditional test={error}>
        <ErrorWrapper>
          <IconWrapper>
            <IconError />
          </IconWrapper>

          <Error>{error}</Error>
        </ErrorWrapper>
      </Conditional>
    </StyledInputWrapper>
  )
})
