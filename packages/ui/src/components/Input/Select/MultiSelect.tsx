import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { useMultiSelect } from '~/hooks/useSelect'
import {
  Value,
  Option,
  FilterSelectBadge,
  FilterSelectMoreBadge,
} from '~/components/Overlay'
import { IconChevronDown } from '~/components/Icons'
import { Text } from '~/components/Text'
import { Color, StitchedCSS, styled } from '~/theme'
import { PositionProps } from '~/types'
import { deepEqual } from '@saulx/utils'
import { StyledSelect } from './StyledSelect'

export type MultiSelectProps = {
  values?: Value[]
  options: (Option | Value)[]
  onChange: (values: Value[]) => void
  color?: Color
  filterable?: boolean
  placeholder?: string
  overlay?: PositionProps
  css?: StitchedCSS
}

const StyledBadgeContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

export const MultiSelect: FC<MultiSelectProps> = ({
  options,
  values,
  onChange,
  css,
  filterable,
  color = '$TextPrimary',
  placeholder = 'Select an option',
  overlay,
}) => {
  const ref = useRef()

  const [displayIndex, setDisplayIndex] = useState(1)

  // if these values update force update on the dropdown
  const [currentValues, open, setValues] = useMultiSelect(options, values, {
    variant: 'over',
    filterable,
    placement: 'left',
    width: 'target',
    ...overlay,
  })

  useEffect(() => {
    if (!deepEqual(currentValues, values)) {
      onChange(currentValues)
    }

    setDisplayIndex(1)

    // check if it fits
  }, [currentValues, ref])

  let optionsBadges: ReactNode

  if (!currentValues?.length) {
    optionsBadges = <Text color="Secondary">{placeholder}</Text>
  } else {
    const c = []

    const len = Math.min(displayIndex, currentValues.length)

    for (let i = 0; i < len; i++) {
      const v = currentValues[i]
      const opt = options.find((opt) => {
        if (typeof opt === 'object' && opt.value === v) {
          return true
        }
        return false
      })

      c.push(
        <FilterSelectBadge
          key={v}
          css={{ marginRight: 8 }}
          // @ts-ignore not rly great
          label={opt ? opt.label : v}
          onClose={() => {
            const newValues = currentValues.filter((val) => val !== v)
            setValues(newValues)
            onChange(newValues)
          }}
        />
      )
    }

    if (displayIndex < currentValues.length) {
      c.push(
        <FilterSelectMoreBadge
          number={currentValues.length - displayIndex}
          key={currentValues.length}
        />
      )
    }

    optionsBadges = <StyledBadgeContainer>{c}</StyledBadgeContainer>
  }

  return (
    <StyledSelect ref={ref} onClick={open} css={css}>
      {optionsBadges}
      <IconChevronDown color={color} />
    </StyledSelect>
  )
}

// select badge
// -------------------------- MULTI ------------------------
// select component
// "creatable" option where you create the options yes
// SelectBadge
