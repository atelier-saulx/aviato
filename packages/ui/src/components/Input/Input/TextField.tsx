import React, { ElementRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useUuid } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'
import { StitchedCSS, styled } from '~/theme'

import { BaseInput, BaseInputProps, StyledInput } from './BaseInput'
import { Conditional } from '~/components/Utilities'
import { IconError } from '~/icons'

const TextFieldStyles: StitchedCSS = {
  padding: '10px 12px',
  height: 'auto',
  maxHeight: 'auto',
  resize: 'none',
}

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

export interface TextFieldProps extends BaseInputProps {
  autosize?: boolean
  maxRows?: number
  minRows?: number
  label?: string
  error?: string
  invalid?: boolean
}

type ForwardProps = ComponentProps<typeof StyledInput> & TextFieldProps

export const TextField = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    autosize = true,
    minRows,
    maxRows,
    label,
    error,
    invalid,
    ...remainingProps
  } = properties

  const uuid = useUuid({ prefix: 'text-field' })

  const isInvalid = Boolean(error || invalid)

  const InputComponent = () => {
    if (autosize) {
      return (
        <BaseInput
          ref={forwardedRef}
          component={TextareaAutosize}
          css={TextFieldStyles}
          id={uuid}
          maxRows={maxRows}
          minRows={minRows}
          invalid={isInvalid}
          {...remainingProps}
        />
      )
    }

    return (
      <BaseInput
        ref={forwardedRef}
        component="textarea"
        css={TextFieldStyles}
        id={uuid}
        invalid={isInvalid}
        {...remainingProps}
      />
    )
  }

  return (
    <InputWrapper>
      <Conditional test={label}>
        <Label>{label}</Label>
      </Conditional>

      <InputComponent />

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
