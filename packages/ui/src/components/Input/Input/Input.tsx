import React, { ElementRef } from 'react'
import { useUuid } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'

import { BaseInput, BaseInputProps, StyledInput } from './BaseInput'
import { InputWrapper } from '../InputWrapper'

export interface InputProps extends BaseInputProps {
  label?: string
  description?: string
  error?: string
  invalid?: boolean
}

type ForwardProps = ComponentProps<typeof StyledInput> & InputProps

export const Input = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const { label, description, error, invalid, ...remainingProps } = properties

  const uuid = useUuid({ prefix: 'input' })

  const isInvalid = Boolean(error || invalid)

  return (
    <InputWrapper label={label} description={description} error={error}>
      <BaseInput
        ref={forwardedRef}
        id={uuid}
        invalid={isInvalid}
        {...remainingProps}
      />
    </InputWrapper>
  )
})
