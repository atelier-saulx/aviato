import React, { FC, useCallback, useState } from 'react'
import { removeOverlay } from '~/components/BasedUI/Overlay'
import { IconCheck, IconSearch } from '~/components'
import { styled } from '~/theme'
import { ContextItem } from '.'

export type Value = string | number | undefined

export type Option = {
  value: Value
  label?: React.ReactNode | string
}

export type ContextOptionsProps = {
  items: Option[] | null | undefined
  value: undefined | string | number
  onChange: (value: string | number | undefined) => void
  filterable?: boolean
  placeholder?: string
}

const FilterInputHolder = styled('div', {
  paddingTop: 4,
  paddingBottom: 4,
  height: 36,
  paddingLeft: 12,
  paddingRight: 12,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '$ActionLight',
})

const FilterInput = styled('input', {
  position: 'relative',
  display: 'block',
  height: '36px',
  minHeight: '36px',
  width: '100%',
  minWidth: '0px',
  textAlign: 'left',
  paddingLeft: '12px',
  background: 'transparent',
  lineHeight: '$md',
  fontSize: '$md',
  color: '$TextPrimary',
  userSelect: 'text',
})

export const ContextOptionItem: FC<{
  option: Option
  onChange: (value: Value) => void
  value: Value
}> = ({ option, onChange, value }) => {
  const [isSelected, setIsSelected] = useState(0)
  return (
    <ContextItem
      css={{
        backgroundColor:
          isSelected === 1
            ? '$ActionLightSelected !important'
            : isSelected === 1
            ? '$ActionLightHover'
            : null,
        '&:hover': {
          backgroundColor: '$ActionLightHover',
        },
        '&:active': {
          backgroundColor: '$ActionLightHover',
        },
      }}
      inset
      leftIcon={value === option.value ? <IconCheck /> : null}
      onClick={() => {
        setIsSelected(1)
        onChange(option.value)
        setTimeout(() => {
          setIsSelected(2)
          setTimeout(() => {
            removeOverlay()
          }, 125)
        }, 75)
        return true
      }}
    >
      {option.label || option.value}
    </ContextItem>
  )
}

const FilterableContextOptions: FC<ContextOptionsProps> = ({
  items,
  value,
  onChange,
  placeholder,
}) => {
  const [v, setValue] = useState(value)
  const [f, setFilter] = useState('')
  const onFilter: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFilter(e.target.value)
    },
    []
  )

  const children = items
    .filter((opt) => {
      return String(opt.value)
        .replace(/\s/g, '')
        .toLowerCase()
        .includes(f.replace(/\s/g, '').toLowerCase())
    })
    .map((opt, i) => {
      return (
        <ContextOptionItem
          key={i}
          onChange={(v) => {
            setValue(v)
            onChange(v)
          }}
          option={opt}
          value={v}
        />
      )
    })
  return (
    <>
      <FilterInputHolder>
        <IconSearch color="$TextSecondary" />
        <FilterInput
          autoFocus
          placeholder={placeholder || 'Filter...'}
          onChange={onFilter}
        />
      </FilterInputHolder>
      {children}
    </>
  )
}

export const ContextOptions: FC<ContextOptionsProps> = ({
  items = [],
  value,
  onChange,
  filterable,
  placeholder,
}) => {
  const [v, setValue] = useState(value)

  if (filterable) {
    return (
      <FilterableContextOptions
        items={items}
        value={value}
        onChange={onChange}
        filterable={filterable}
        placeholder={placeholder}
      />
    )
  } else {
    const children = items.map((opt, i) => {
      return (
        <ContextOptionItem
          key={i}
          onChange={(v) => {
            setValue(v)
            onChange(v)
          }}
          option={opt}
          value={v}
        />
      )
    })
    return <>{children}</>
  }
}
