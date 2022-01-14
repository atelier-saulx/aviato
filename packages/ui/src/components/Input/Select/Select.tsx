import React, { useRef, forwardRef, ElementRef, useCallback } from 'react'
import { useMergedRef, useUuid } from '@aviato/hooks'
import { noop } from '@aviato/utils'

import { StitchedCSS } from '~/theme'
import { BaseInput, BaseInputProps, StyledInput } from '../Input/BaseInput'
import { SelectItem } from './types'
import { DropdownMenu } from './Dropdown'
import { InputWrapper } from '../InputWrapper'
import { onChange } from '~/types'

const SelectStyles: StitchedCSS = {
  cursor: 'pointer',
}

export interface OnSelectChange extends onChange {
  value: string | SelectItem
}

export interface SelectProps extends BaseInputProps {
  data: (string | SelectItem)[]
  label?: string
  description?: string
  error?: string
  invalid?: boolean
  searchable?: boolean
  disabled?: boolean
  onChange?: (value: string, payload: OnSelectChange) => void
}

export const Select = forwardRef<ElementRef<typeof StyledInput>, SelectProps>(
  (properties, forwardedRef) => {
    const {
      label,
      description,
      error,
      invalid,
      placeholder,
      data,
      searchable = false,
      onChange = noop,
    } = properties

    const uuid = useUuid({ prefix: 'select' })
    const inputRef = useRef<HTMLInputElement>()

    const isInvalid = Boolean(error || invalid)

    const formattedData: SelectItem[] = data.map((item) => {
      if (typeof item === 'string') {
        return { label: item, value: item, disabled: false }
      }

      return item
    })

    const handleChange = useCallback((event, payload) => {
      onChange(event, payload)
    }, [])

    const handleOpenChange = useCallback((isOpen: boolean) => {
      // TODO: Force focus to input field
      if (isOpen) {
        inputRef.current?.focus()
      }
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
          readOnly={!searchable}
          placeholder={placeholder}
        />

        <DropdownMenu
          items={formattedData}
          onChange={handleChange}
          onOpenChange={handleOpenChange}
        >
          Dropdown
        </DropdownMenu>
      </InputWrapper>
    )
  }
)
