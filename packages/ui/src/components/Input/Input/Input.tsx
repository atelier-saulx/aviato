import React, { ElementRef, forwardRef } from 'react'
import { useUuid } from '~/hooks'

import { BaseInput, BaseInputProps, StyledInput } from './BaseInput'
import { InputWrapper } from '../InputWrapper'

export interface InputProps extends BaseInputProps {
  label?: string
  description?: string
  error?: string
  invalid?: boolean
}

export { InputWrapper }

export const Input = forwardRef<ElementRef<typeof StyledInput>, InputProps>(
  (properties, forwardedRef) => {
    const { label, description, error, invalid, ...remainingProps } = properties

    const uuid = useUuid({ prefix: 'input' })

    const isInvalid = Boolean(error || invalid)

    return (
      <InputWrapper
        label={label}
        description={description}
        error={error}
        css={{ width: '100%' }}
      >
        <BaseInput
          id={uuid}
          invalid={isInvalid}
          ref={forwardedRef}
          {...remainingProps}
        />
      </InputWrapper>
    )
  }
)

Input.displayName = 'Input'
