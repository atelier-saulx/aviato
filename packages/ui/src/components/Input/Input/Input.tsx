import React, { ElementRef } from 'react'
import { useUuid } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'
import { Conditional } from '~/components/Utilities'

import { BaseInput, BaseInputProps, StyledInput } from './BaseInput'
import { IconError } from '~/icons'

const InputWrapper = styled('div', {
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

export interface InputProps extends BaseInputProps {
  label?: string
  error?: string
}

type ForwardProps = ComponentProps<typeof StyledInput> & InputProps

export const Input = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const { label, error, invalid, ...remainingProps } = properties

  const uuid = useUuid({ prefix: 'input' })

  return (
    <InputWrapper>
      <Conditional test={label}>
        <Label>{label}</Label>
      </Conditional>

      <BaseInput
        ref={forwardedRef}
        id={uuid}
        {...remainingProps}
        invalid={Boolean(error || invalid)}
      />

      <Conditional test={error}>
        <ErrorWrapper>
          <IconWrapper>
            <IconError />
          </IconWrapper>

          <Error>{error}</Error>
        </ErrorWrapper>
      </Conditional>
    </InputWrapper>
  )
})
