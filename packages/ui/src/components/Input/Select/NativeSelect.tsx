import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { useUuid } from '~/hooks'
import { BaseInput, BaseInputProps, StyledInput } from '../Input/BaseInput'
import { InputWrapper } from '../InputWrapper'
import { SelectItem } from './types'
import { onChange } from '~/types'

export interface OnNativeSelectChange extends onChange {
  value: string | SelectItem
}

export interface NativeSelectProps extends BaseInputProps {
  data: (string | SelectItem)[]
  label?: string
  description?: string
  error?: string
  invalid?: boolean
  onChange?: (value: string, payload: OnNativeSelectChange) => void
}

type StitchedProps = ComponentProps<typeof StyledInput>
type ForwardProps = Omit<StitchedProps, 'onChange'> & NativeSelectProps

export const NativeSelect = forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    data,
    label,
    description,
    error,
    invalid,
    onChange = noop,
    ...remainingProps
  } = properties

  const formattedData: SelectItem[] = data.map((item) => {
    if (typeof item === 'string') {
      return { label: item, value: item, disabled: false }
    }

    return item
  })

  const options = formattedData.map(({ value, label, disabled }, index) => (
    <option key={`option-${value}-${index}`} value={value} disabled={disabled}>
      {label}
    </option>
  ))

  const uuid = useUuid({ prefix: 'select' })

  const isInvalid = Boolean(error || invalid)

  const handleChange = (value, { event }) => {
    const index = formattedData.findIndex((item) => item.value === value)

    onChange(value, { event, value, index })
  }

  return (
    <InputWrapper
      label={label}
      description={description}
      error={error}
      css={{ width: '100%' }}
    >
      <BaseInput
        component="select"
        id={uuid}
        invalid={isInvalid}
        ref={forwardedRef}
        onChange={(value, { event }) => handleChange(value, { event })}
        {...remainingProps}
      >
        {options}
      </BaseInput>
    </InputWrapper>
  )
})

NativeSelect.displayName = 'NativeSelect'
