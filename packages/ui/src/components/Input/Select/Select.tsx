import React, {
  useRef,
  forwardRef,
  ElementRef,
  useCallback,
  useState,
  useEffect,
} from 'react'
import { useMergedRef, useUuid, useUncontrolled } from '@aviato/hooks'
import { noop } from '@aviato/utils'

import { StitchedCSS } from '~/theme'
import { BaseInput, BaseInputProps, StyledInput } from '../Input/BaseInput'
import { SelectItem } from './types'
import { DropdownMenu } from './Dropdown'
import { InputWrapper } from '../InputWrapper'
import { onChange } from '~/types'
import { groupOptions } from './utils'

const SelectStyles: StitchedCSS = {
  cursor: 'pointer',
}

export interface OnSelectChange extends onChange {
  value: string | SelectItem
}

export interface SelectProps extends BaseInputProps {
  value?: string
  defaultValue?: string
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
      value,
      defaultValue,
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

    const sortedData = groupOptions({ data: formattedData })

    const [_value, handleChange, inputMode] = useUncontrolled({
      value,
      defaultValue,
      finalValue: null,
      onChange,
      rule: (val) => typeof val === 'string' || val === null,
    })

    const selectedValue = sortedData.find((item) => item.value === _value)
    const [inputValue, setInputValue] = useState(selectedValue?.label ?? '')

    const handleOpenChange = useCallback(() => {
      // TODO: Force focus to input field
    }, [])

    const handleInputChange = (value) => {
      handleSearchChange(value)
    }

    const handleSearchChange = (value: string) => {
      setInputValue(value)
    }

    const handleItemSelect = useCallback((event, payload) => {
      handleChange(payload.value)
      onChange(event, payload)

      if (inputMode === 'uncontrolled') {
        handleSearchChange(payload.label)
      }
    }, [])

    useEffect(() => {
      const newSelectedValue = sortedData.find((item) => item.value === _value)

      if (newSelectedValue) {
        handleSearchChange(newSelectedValue.label)
      } else if (!_value) {
        handleSearchChange('')
      }
    }, [_value])

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
          value={inputValue}
          onChange={handleInputChange}
        />

        <DropdownMenu
          items={formattedData}
          onChange={handleItemSelect}
          onOpenChange={handleOpenChange}
        >
          Dropdown
        </DropdownMenu>
      </InputWrapper>
    )
  }
)
