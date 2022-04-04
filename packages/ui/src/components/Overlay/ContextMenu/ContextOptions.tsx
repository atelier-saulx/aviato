import React, { FC, useCallback, useState, forwardRef, ElementRef } from 'react'
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
  resize?: () => void
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

export const ContextOptionItem = forwardRef<
  ElementRef<typeof ContextItem>,
  {
    option: Option
    onChange: (value: Value) => void
    value: Value
    tabIndex?: number
  }
>(({ option, onChange, value, tabIndex }, forwardedRef) => {
  const [isSelected, setIsSelected] = useState(0)
  return (
    <ContextItem
      ref={forwardedRef}
      tabIndex={tabIndex}
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
})

// max height
// multi select
// move based ui in
// fix arrows
// enter key
// focus

// select component
// multi select + filter

// "creatable" option where you create the options yes

// SelectBage

const FilterableContextOptions: FC<ContextOptionsProps> = ({
  items,
  value,
  onChange,
  resize,
  placeholder,
}) => {
  const [v, setValue] = useState(value)
  const [f, setFilter] = useState('')
  const onFilter: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFilter(e.target.value)
      if (resize) {
        resize()
      }
    },
    []
  )

  const children = items
    .filter((opt) => {
      const s = String(opt.value)
      const splitFilter = f.split(' ')
      let correct = 0
      for (const segment of splitFilter) {
        if (s.includes(segment.toLocaleLowerCase())) {
          correct++
          if (correct === splitFilter.length) {
            return true
          }
        }
      }
      return false
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
          data-aviato-context-item
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
  resize,
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
        resize={resize}
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

// multi select
