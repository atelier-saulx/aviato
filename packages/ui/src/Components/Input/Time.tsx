import React, { FunctionComponent, useRef, useEffect } from 'react'
import { OnValueChange } from '../../types'
import { Time } from '../../icons'
import {
  milisecondsToTimeString,
  timeValueToMiliseconds,
} from './dateTimeFunctions'
import { MultiSectionInput, MultiSectionInputProps } from './MultiSectionInput'
import { Section } from './MultiSectionInputFunctions'

type TimeInputProps = Omit<
  MultiSectionInputProps,
  'icon' | 'value' | 'sections'
> & {
  value: Date | number | string | null
  onChange: OnValueChange<number | undefined>
  useSeconds?: boolean
}

/**
 * Time inpuut field
 * WARNING: Accepts and returns miliseconds.
 * If milliseconds are used as timestamp to a Date object it will add local timezone offset
 * when getting or viewing value.
 * UTC functions must be used when setting or getting hours/minustes/seconds:
 * setUTCHours(), getUTC*(), toUTCString()
 */
export const TimeInput: FunctionComponent<TimeInputProps> = ({
  border,
  value,
  style,
  identifier,
  onChange,
  useSeconds = false,
  noBackground,
  color = { color: 'background', tone: 1 },
  noHover,
  weight,
}) => {
  let timeString =
    milisecondsToTimeString(timeValueToMiliseconds(value), useSeconds) || ''

  const setTimeString = (value: string): void => {
    timeString = value
  }

  const update = (value: string) => {
    onChange(timeValueToMiliseconds(value))
  }

  const initialValue = useRef<Date | number | string | null>()
  const initialIdentifier = useRef<string | number | undefined>()

  useEffect(() => {
    if (
      value !== initialValue.current ||
      identifier !== initialIdentifier.current
    ) {
      setTimeString(
        milisecondsToTimeString(timeValueToMiliseconds(value), useSeconds)
      )
      initialValue.current = value
      initialIdentifier.current = identifier
    }
  }, [value, identifier])

  let sections: Section[] = [
    {
      validation: /^(\d|[0-1]\d|2[0-3])$/,
      maxSize: 2,
      preprocess: (v) => ('00' + v).substr(-2),
      separator: ':',
      default: '00',
    },
    {
      validation: /^(\d|[0-5]\d|2\d)$/,
      maxSize: 2,
      preprocess: (v) => ('00' + v).substr(-2),
      separator: ':',
      default: '00',
    },
  ]
  if (useSeconds) {
    sections.push({
      validation: /^(\d|[0-5]\d|2\d)$/,
      maxSize: 2,
      preprocess: (v) => ('00' + v).substr(-2),
      default: '00',
    })
  }

  return (
    <MultiSectionInput
      onChange={update}
      border={border}
      value={timeString}
      style={style}
      noBackground={noBackground}
      color={color}
      weight={weight}
      noHover={noHover}
      icon={Time}
      placeholder={useSeconds ? 'hh:mm:ss' : 'hh:mm'}
      sections={sections}
    />
  )
}
