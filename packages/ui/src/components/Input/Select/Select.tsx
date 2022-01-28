import React, {
  useRef,
  forwardRef,
  ElementRef,
  useState,
  useEffect,
} from 'react'

import { useMergedRef, useUuid, useUncontrolled } from '~/hooks'
import { StitchedCSS } from '~/theme'
import { BaseInput, BaseInputProps, StyledInput } from '../Input/BaseInput'
import { SelectItem } from './types'
import { Dropdown } from './Dropdown'
import { InputWrapper } from '../InputWrapper'
import { onChange } from '~/types'
import { defaultFilter, filterData, groupOptions } from './utils'

const SelectStyles: StitchedCSS = {
  cursor: 'pointer',
}

export interface OnSelectChange extends onChange {
  value: string | SelectItem
}

export interface SelectProps extends BaseInputProps {
  value?: string
  defaultValue?: string
  data: SelectItem[]
  label?: string
  description?: string
  error?: string
  invalid?: boolean
  searchable?: boolean
  disabled?: boolean
  limit?: number
  filter?(value: string, item: SelectItem): boolean
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
      disabled = false,
      limit = Infinity,
      filter = defaultFilter,
      ...remainingProps
    } = properties

    const uuid = useUuid({ prefix: 'select' })
    const inputRef = useRef<HTMLInputElement>()

    const [dropdownOpened, setDropdownOpened] = useState(false)
    const [hovered, setHovered] = useState(-1)

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
      rule: (value) => typeof value === 'string' || value === null,
    })

    const selectedValue = sortedData.find((item) => item.value === _value)
    const [inputValue, setInputValue] = useState(selectedValue?.label ?? '')

    const filteredData = filterData({
      data: sortedData,
      searchable,
      limit,
      searchValue: inputValue,
      filter,
    })

    const handleInputChange = (value: string) => {
      handleSearchChange(value)
      setHovered(0)
      setDropdownOpened(true)
    }

    const handleSearchChange = (value: string) => {
      setInputValue(value)
    }

    const handleItemSelect = (item: SelectItem) => {
      if (selectedValue?.value === item.value) {
        handleChange(null)
        setDropdownOpened(false)
      } else {
        handleChange(item.value)

        if (inputMode === 'uncontrolled') {
          handleSearchChange(item.label)
        }

        setHovered(-1)
        setDropdownOpened(false)
        inputRef.current.focus()
      }
    }

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

    const selectedItemIndex = _value
      ? filteredData.findIndex((element) => element.value === _value)
      : 0

    const handleInputKeydown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      const { code } = event?.nativeEvent ?? {}

      switch (code) {
        case 'ArrowUp': {
          event.preventDefault()

          if (!dropdownOpened) {
            setHovered(selectedItemIndex)
            setDropdownOpened(true)
          }

          break
        }

        case 'ArrowDown': {
          event.preventDefault()

          if (!dropdownOpened) {
            setHovered(selectedItemIndex)
            setDropdownOpened(true)
          }

          break
        }

        case 'Escape': {
          event.preventDefault()
          setDropdownOpened(false)
          break
        }

        case 'Space': {
          if (!searchable) {
            if (filteredData[hovered] && dropdownOpened) {
              event.preventDefault()
              handleItemSelect(filteredData[hovered])
            } else {
              setDropdownOpened(!dropdownOpened)
            }
          }

          break
        }

        case 'Enter': {
          event.preventDefault()

          if (filteredData[hovered] && dropdownOpened) {
            event.preventDefault()
            handleItemSelect(filteredData[hovered])
          } else {
            setDropdownOpened(true)
          }
        }
      }
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
          disabled={disabled}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeydown}
          {...remainingProps}
        />

        <Dropdown
          items={formattedData}
          mounted={shouldShowDropdown}
          onChange={(_, payload) => {
            handleItemSelect(data[payload.index])
          }}
          referenceElement={inputRef.current}
          uuid={uuid}
        />
      </InputWrapper>
    )
  }
)

Select.displayName = 'Select'
