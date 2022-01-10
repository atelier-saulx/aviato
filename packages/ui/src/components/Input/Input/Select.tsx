import React, { ElementRef, useCallback } from 'react'
import { useUuid } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'
import { StitchedCSS } from '~/theme'

import { BaseInput, BaseInputProps, StyledInput } from './BaseInput'
import { InputWrapper } from '../InputWrapper'
import { SelectItem } from './types'
import { onChange } from '~/types'

const SelectStyles: StitchedCSS = {}

export interface OnSelectChange extends onChange {
  value: string | SelectItem
}

export interface SelectProps extends BaseInputProps {
  data: (string | SelectItem)[]
  label?: string
  description?: string
  error?: string
  invalid?: boolean
  onChange?: (value: string, payload: OnSelectChange) => void
}

type StitchedProps = ComponentProps<typeof StyledInput>
type ForwardProps = Omit<StitchedProps, 'onChange'> & SelectProps

export const Select = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    label,
    description,
    error,
    invalid,
    onChange = noop,
    ...remainingProps
  } = properties

  const uuid = useUuid({ prefix: 'select' })

  const isInvalid = Boolean(error || invalid)

  const handleChange = useCallback((event) => {
    onChange(event)
  }, [])

  return (
    <InputWrapper
      label={label}
      description={description}
      error={error}
      css={{ width: '100%' }}
    >
      <BaseInput
        css={SelectStyles}
        id={uuid}
        invalid={isInvalid}
        ref={forwardedRef}
        readOnly
        onChange={handleChange}
        {...remainingProps}
      />
    </InputWrapper>
  )
})