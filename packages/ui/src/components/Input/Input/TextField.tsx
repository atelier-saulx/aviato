import React, { ElementRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useUuid } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'
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
    description,
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
    <InputWrapper
      label={label}
      description={description}
      error={error}
      css={{ width: '100%' }}
    >
      <InputComponent />
    </InputWrapper>
  )
})
