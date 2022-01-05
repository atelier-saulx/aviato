import React, { ElementRef } from 'react'
import { useUuid } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'
import { StitchedCSS } from '~/theme'

import { BaseInput, BaseInputProps, StyledInput } from './BaseInput'
import { InputWrapper } from '../InputWrapper'

const SelectStyles: StitchedCSS = {}

export interface SelectProps extends BaseInputProps {
  label?: string
  description?: string
  error?: string
  invalid?: boolean
}

type StitchedProps = ComponentProps<typeof StyledInput>
type ForwardProps = Omit<StitchedProps, 'onChange'> & SelectProps

export const Select = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const { label, description, error, invalid, ...remainingProps } = properties

  const uuid = useUuid({ prefix: 'select' })

  const isInvalid = Boolean(error || invalid)

  return (
    <InputWrapper
      label={label}
      description={description}
      error={error}
      css={{ width: '100%' }}
    >
      <BaseInput
        component="select"
        css={SelectStyles}
        id={uuid}
        invalid={isInvalid}
        ref={forwardedRef}
        {...remainingProps}
      />
    </InputWrapper>
  )
})
