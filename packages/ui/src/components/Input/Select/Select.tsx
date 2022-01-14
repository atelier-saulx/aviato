import React, { useRef, forwardRef, ElementRef, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'
import { useMergedRef, useUuid } from '@aviato/hooks'
import { noop } from '@aviato/utils'

import { StitchedCSS } from '~/theme'
import { BaseInput, BaseInputProps, StyledInput } from '../Input/BaseInput'
import { SelectItem } from './types'
import { InputWrapper } from '../InputWrapper'
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

export const Select = forwardRef<ElementRef<typeof StyledInput>, ForwardProps>(
  (properties, forwardedRef) => {
    const {
      label,
      description,
      error,
      invalid,
      onChange = noop,
      ...remainingProps
    } = properties

    const uuid = useUuid({ prefix: 'select' })
    const inputRef = useRef<HTMLInputElement>()

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
          ref={useMergedRef(forwardedRef, inputRef)}
          readOnly
          onChange={handleChange}
          {...remainingProps}
        />
      </InputWrapper>
    )
  }
)
