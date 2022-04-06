import React, { FC, useEffect } from 'react'
import { useSelect } from '~/hooks/useSelect'
import { Value, Option } from '~/components/Overlay'
import { IconChevronDown } from '~/components/Icons'
import { Text } from '~/components/Text'
import { Color, styled, StitchedCSS } from '~/theme'
import { PositionProps } from '~/types'

const SelectStyled = styled('div', {
  justifyContent: 'space-between',
  borderRadius: 4,
  alignItems: 'center',
  border: '1px solid $OtherDivider',
  backgroundColor: '$Background1dp',
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 6,
  paddingBottom: 6,
  cursor: 'pointer',
  userSelect: 'none',
  display: 'flex',
  width: '100%',
  '&:hover': {
    backgroundColor: '$ActionLightHover',
  },
})

export type SelectProps = {
  value?: Value
  options: (Option | Value)[]
  onChange: (value: Value) => void
  color?: Color
  filterable?: boolean
  placeholder?: string
  overlay?: PositionProps
  css?: StitchedCSS
}

export const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  css,
  filterable,
  color = '$TextPrimary',
  placeholder = 'Select an option',
  overlay,
}) => {
  // label + description

  const [currentValue, open] = useSelect(options, value, {
    variant: 'over',
    filterable,
    placement: 'left',
    width: 'target',
    ...overlay,
  })

  useEffect(() => {
    if (currentValue !== value) {
      onChange(currentValue)
    }
  }, [currentValue])

  return (
    <SelectStyled onClick={open} css={css}>
      {/* @ts-ignore TODO: need to fix this later all COLOR props are the same */}
      <Text color={color}>{currentValue || placeholder}</Text>
      <IconChevronDown color={color} />
    </SelectStyled>
  )
}

// useMultiSelect

// LabelInputGroup

// export type MultiSelectProps = {}

// export const MultiSelect: FC<MultiSelectProps> = () => {
//   return <div></div>
// }

// -------------------------- MULTI ------------------------
// select component
// "creatable" option where you create the options yes
// SelectBadge
