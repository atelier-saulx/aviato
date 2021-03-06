import React, { forwardRef, ElementRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import { useUuid } from '~/hooks'
import { StitchedCSS } from '~/theme'
import { BaseInput, BaseInputProps, StyledInput } from './BaseInput'
import { InputWrapper } from '../InputWrapper'

const TextFieldStyles: StitchedCSS = {
  padding: '10px 12px',
  height: 'auto',
  maxHeight: 'auto',
  resize: 'none',
}

export interface TextFieldProps extends BaseInputProps {
  autosize?: boolean
  maxRows?: number
  minRows?: number
  label?: string
  description?: string
  error?: string
  invalid?: boolean
}

export const TextField = forwardRef<
  ElementRef<typeof StyledInput>,
  TextFieldProps
>((properties, forwardedRef) => {
  const {
    autosize = true,
    minRows,
    maxRows,
    label,
    description,
    error,
    invalid,
    ...remainingProps
  } = properties

  const uuid = useUuid({ prefix: 'text-field' })

  const isInvalid = Boolean(error || invalid)

  return (
    <InputWrapper
      label={label}
      description={description}
      error={error}
      css={{ width: '100%' }}
    >
      {autosize ? (
        <BaseInput
          component={TextareaAutosize}
          css={TextFieldStyles}
          id={uuid}
          maxRows={maxRows}
          minRows={minRows}
          invalid={isInvalid}
          ref={forwardedRef}
          {...remainingProps}
        />
      ) : (
        <BaseInput
          component="textarea"
          css={TextFieldStyles}
          id={uuid}
          invalid={isInvalid}
          ref={forwardedRef}
          {...remainingProps}
        />
      )}
    </InputWrapper>
  )
})

TextField.displayName = 'TextField'
