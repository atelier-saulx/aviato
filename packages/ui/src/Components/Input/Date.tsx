import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { OnValueChange } from '../../types'
import { Date as DateIcon } from '../../icons'
import {
  dateValueToTimestamp,
  timestampToDateString,
} from './dateTimeFunctions'
import { DatePickerOverlay } from './DatePickerOverlay'
import useOverlay from '../../hooks/overlay/useOverlay'
import { MultiSectionInput, MultiSectionInputProps } from './MultiSectionInput'

type DateInputProps = Omit<
  MultiSectionInputProps,
  'icon' | 'value' | 'sections'
> & {
  value: number
  onChange: OnValueChange<number | undefined>
}

// TODO: handle tab when popup is open
export const DateInput: FunctionComponent<DateInputProps> = ({
  border = false,
  style,
  value,
  identifier,
  color = { color: 'background', tone: 1 },
  onChange,
  noBackground,
  noHover,
  weight,
}) => {
  const [hasFocus, setHasFocus] = useState(false)

  let [dateString, setDateString] = useState<string>(
    timestampToDateString(Number(value))
  )

  const [datePickerDate, setDatePickerDate] = useState<Date>(
    value ? new Date(value) : new Date()
  )

  const update = (value: string): void => {
    const re = /^(\d{1,2})\/(\d{1,2})\/(\d{1,4})$/
    onChange(dateValueToTimestamp(value))
    if (re.test(value)) {
      setDatePickerDate(new Date(dateValueToTimestamp(value)))
    }
  }

  const initialValue = useRef<string | number>()
  const initialIdentifier = useRef<string | number | undefined>()

  useEffect(() => {
    const shouldSetValue =
      value !== initialValue.current || identifier !== initialIdentifier.current

    if (shouldSetValue) {
      setDateString(timestampToDateString(dateValueToTimestamp(value)))
      initialValue.current = value
      initialIdentifier.current = identifier
    }
  }, [value, identifier])

  const sections = [
    {
      validation: /^(\d|[0-2]\d|3[0-1])$/,
      maxSize: 2,
      preprocess: (value: string) => ('00' + value).substr(-2),
      separator: '/',
      default: ('00' + new Date().getDate()).substr(-2),
    },
    {
      validation: /^(0?\d|1[0-2])$/,
      maxSize: 2,
      preprocess: (value: string) => ('00' + value).substr(-2),
      separator: '/',
      default: ('00' + (new Date().getMonth() + 1)).substr(-2),
    },
    {
      validation: /^([1-2]\d{3})$/,
      maxSize: 4,
      preprocess: (value: string) => value,
      default: String(new Date().getFullYear()),
    },
  ]
  return (
    <MultiSectionInput
      onChange={update}
      onChangeStrategy="onChangeAndValid"
      border={border}
      value={dateString}
      style={style}
      noBackground={noBackground}
      color={color}
      weight={weight}
      noHover={noHover}
      icon={DateIcon}
      hasFocus={hasFocus}
      placeholder="dd/mm/yyyy"
      onFocus={useOverlay(
        DatePickerOverlay,
        {
          date: datePickerDate,
          align: 'flex-end',
          width: 260,
          onChange: (newDate) => {
            setDateString(timestampToDateString(dateValueToTimestamp(newDate)))
            update(timestampToDateString(dateValueToTimestamp(newDate)))
          },
        },
        () => {
          setHasFocus(true)
          return () => {
            setHasFocus(false)
          }
        }
      )}
      sections={sections}
    />
  )
}
