import React, { ElementRef } from 'react'
import { useUuid } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'
import { Conditional } from '~/components/Utilities'

import { BaseInput, BaseInputProps, StyledInput } from './BaseInput'

const InputWrapper = styled('div', {
  width: '100%',
})

const Label = styled('label', {
  fontSize: 15,
  lineHeight: '24px',
  marginBottom: 4,
})

const ErrorWrapper = styled('div', {})

const Error = styled('div', {
  fontSize: 15,
  lineHeight: '24px',
  marginTop: 4,
  color: '$ErrorMain',
})

export interface InputProps extends BaseInputProps {
  label?: string
  error?: string
}

type ForwardProps = ComponentProps<typeof StyledInput> & InputProps

export const Input = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const { label, error, ...remainingProps } = properties

  const uuid = useUuid({ prefix: 'input' })

  return (
    <InputWrapper>
      <Conditional test={label}>
        <Label>{label}</Label>
      </Conditional>

      <BaseInput ref={forwardedRef} id={uuid} {...remainingProps} />

      <Conditional test={error}>
        <ErrorWrapper>
          <Error>{error}</Error>
        </ErrorWrapper>
      </Conditional>
    </InputWrapper>
  )
})
