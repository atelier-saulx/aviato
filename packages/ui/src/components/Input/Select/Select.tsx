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
import { Dropdown } from './Dropdown'
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
  onDropdownOpen?(): void
  onDropdownClose?(): void
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
      onDropdownOpen,
      onDropdownClose,
    } = properties

    const uuid = useUuid({ prefix: 'select' })
    const inputRef = useRef<HTMLInputElement>()

    const [dropdownOpened, _setDropdownOpened] = useState(false)

    const setDropdownOpened = (opened: boolean) => {
      _setDropdownOpened(opened)
      const handler = opened ? onDropdownOpen : onDropdownClose
      typeof handler === 'function' && handler()
    }

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
      rule: (val) => typeof val === 'string' || val === null,
      onChange: () => {},
    })

    const selectedValue = sortedData.find((item) => item.value === _value)
    const [inputValue, setInputValue] = useState(selectedValue?.label ?? '')

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

    const handleInputClick = () => {
      let dropdownOpen = true

      if (!searchable) {
        dropdownOpen = !dropdownOpened
      }

      setDropdownOpened(dropdownOpen)
    }

    const handleInputFocus = () => {
      if (searchable) {
        setDropdownOpened(true)
      }
    }

    const handleInputBlur = () => {
      const selected = sortedData.find((item) => item.value === _value)
      handleSearchChange(selected?.label || '')
      setDropdownOpened(false)
    }

    const shouldShowDropdown = dropdownOpened

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
          ref={useMergedRef(inputRef, forwardedRef)}
          readOnly={!searchable}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />

        <Dropdown
          items={formattedData}
          mounted={shouldShowDropdown}
          onChange={handleItemSelect}
          referenceElement={inputRef.current}
          uuid={uuid}
        />
      </InputWrapper>
    )
  }
)
