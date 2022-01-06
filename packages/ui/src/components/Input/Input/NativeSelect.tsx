import React, { ElementRef, useCallback } from 'react'
import { useUuid } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'
import { StitchedCSS } from '~/theme'

import { BaseInput, BaseInputProps, StyledInput } from './BaseInput'
import { InputWrapper } from '../InputWrapper'
import { SelectItem } from './types'
import { onChange } from '~/types'

const NativeSelectStyles: StitchedCSS = {}

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

export const NativeSelect = React.forwardRef<
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

  const handleChange = useCallback((value, { event }) => {
    const index = formattedData.findIndex((item) => item.value === value)

    onChange(value, { event, index })
  }, [])

  return (
    <InputWrapper
      label={label}
      description={description}
      error={error}
      css={{ width: '100%' }}
    >
      <BaseInput
        component="select"
        css={NativeSelectStyles}
        id={uuid}
        invalid={isInvalid}
        ref={forwardedRef}
        onChange={handleChange}
        {...remainingProps}
      >
        {options}
      </BaseInput>
    </InputWrapper>
  )
})
