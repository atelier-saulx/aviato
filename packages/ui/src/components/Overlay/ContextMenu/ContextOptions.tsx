import React, {
  FC,
  useCallback,
  useState,
  forwardRef,
  ElementRef,
  useReducer,
} from 'react'
import { removeOverlay } from '~/components/BasedUI/Overlay'
import { IconCheck, IconSearch, IconClose, Text } from '~/components'
import { styled } from '~/theme'
import { ContextItem } from '.'

const FilterInputHolderSticky = styled('div', {
  width: '100%',
  position: 'sticky',
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  top: 0,
  backgroundColor: '$Background2dp',
})

const FilterInputHolder = styled('div', {
  paddingTop: 4,
  paddingBottom: 4,
  height: 36,
  paddingLeft: 22,
  paddingRight: 12,
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid $OtherDivider',
  width: '100%',
  backgroundColor: '$ActionLightHover',
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

export type Value = string | number | undefined

export type Option = {
  value: Value
  label?: React.ReactNode | string
}

export type ContextOptionsFilterProps = {
  filterable?: boolean
  placeholder?: string
  resize?: () => void
  multiSelect?: boolean
}

export type ContextOptionsProps = {
  items: Option[] | null | undefined
  value?: Value
  onChange: (value: Value) => void
}

export type ContextMultiOptionsProps = {
  items: Option[] | null | undefined
  values?: Value[]
  onChange: (values: Value[]) => void
}

export const ContextOptionItem = forwardRef<
  ElementRef<typeof ContextItem>,
  {
    option: Option
    onChange: (value: Value) => void
    selected: boolean
    tabIndex?: number
    noRemove?: boolean
  }
>(({ option, onChange, selected, tabIndex, noRemove }, forwardedRef) => {
  const [isSelected, setIsSelected] = useState(0)

  if (option.value === '$-no-results-aviato') {
    return (
      <ContextItem inset noFocus color="$TextSecondary">
        {option.label}
      </ContextItem>
    )
  }

  return (
    <ContextItem
      inset
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
      leftIcon={selected ? <IconCheck /> : null}
      onClick={() => {
        setIsSelected(1)
        onChange(option.value)
        setTimeout(() => {
          setIsSelected(2)
          setTimeout(() => {
            if (!noRemove) {
              removeOverlay()
            } else {
              setIsSelected(0)
            }
          }, 125)
        }, 75)
        return true
      }}
    >
      {option.label || option.value}
    </ContextItem>
  )
})

const filterItems = (items: Option[], filter?: string): Option[] => {
  if (filter) {
    const filtered = items.filter((opt) => {
      const s = String(opt.value)
      const splitFilter = filter.split(' ')
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

    if (filtered.length === 0) {
      return [{ value: '$-no-results-aviato', label: 'No results' }]
    }

    return filtered
  }
  return items
}

const FilterableContextOptions: FC<
  ContextOptionsProps & ContextOptionsFilterProps
> = ({ items, value, onChange, resize, placeholder }) => {
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
  const filteredItems = filterItems(items, f)
  return (
    <>
      <FilterInputHolderSticky>
        <FilterInputHolder>
          <IconSearch color="$TextSecondary" />
          <FilterInput
            data-aviato-context-item
            placeholder={placeholder || 'Filter...'}
            onChange={onFilter}
          />
        </FilterInputHolder>
      </FilterInputHolderSticky>
      <ContextItems items={filteredItems} onChange={onChange} value={value} />
    </>
  )
}

const ContextItems: FC<ContextOptionsProps> = ({ items, value, onChange }) => {
  const [v, setValue] = useState(value)
  const children = items.map((opt, i) => {
    return (
      <ContextOptionItem
        key={i}
        onChange={(v) => {
          setValue(v)
          onChange(v)
        }}
        option={opt}
        selected={v === opt.value}
      />
    )
  })
  return <>{children}</>
}

export const ContextOptions: FC<
  ContextOptionsProps & ContextOptionsFilterProps
> = ({ items = [], value, onChange, filterable, placeholder, resize }) => {
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
    return <ContextItems items={items} onChange={onChange} value={value} />
  }
}

// -------------------------- MULTI ------------------------

// move based ui in
// select component
// "creatable" option where you create the options yes
// SelectBadge

const selectValuesReducer = (state: Value[], action: Value): Value[] => {
  if (state.includes(action)) {
    return state.filter((v) => v !== action)
  } else {
    return [...state, action]
  }
}

const ContextMultiItems: FC<ContextMultiOptionsProps> = ({
  items,
  values = [],
  onChange,
}) => {
  const [currentValues, setValue] = useReducer(selectValuesReducer, values)
  const children = items.map((opt, i) => {
    return (
      <ContextOptionItem
        key={i}
        onChange={(v) => {
          setValue(v)
          onChange(selectValuesReducer(currentValues, v))
        }}
        option={opt}
        noRemove
        selected={currentValues.includes(opt.value)}
      />
    )
  })
  return <>{children}</>
}

const FilterInputMultiHolder = styled('div', {
  paddingBottom: 4,
  flexWrap: 'wrap',
  paddingTop: 4,
  borderTopLeftRadius: 4,
  borderBottom: '1px solid $OtherDivider',
  borderTopRightRadius: 4,
  display: 'flex',
  width: '100%',
  backgroundColor: '$ActionLight',
})

const FilterMultiInput = styled('input', {
  position: 'relative',
  display: 'block',
  width: 'auto',
  flexGrow: 1,
  minWidth: '0px',
  maxWidth: 260,
  paddingRight: 12,
  textAlign: 'left',
  paddingLeft: 12,
  background: 'transparent',
  lineHeight: '$md',
  marginBottom: 4,
  marginTop: 4,
  fontSize: '$md',
  color: '$TextPrimary',
  userSelect: 'text',
})

const FilterSelectedBadge = styled('div', {
  height: 32,
  display: 'flex',
  alignItems: 'center',
  marginLeft: 8,
  marginBottom: 4,
  marginTop: 4,
  borderRadius: 4,
  paddingLeft: 8,
  color: '$TextPrimary',
  paddingRight: 8,
  backgroundColor: '$ActionLight',
})

const FilterableContextMultiOptions: FC<
  ContextMultiOptionsProps & ContextOptionsFilterProps
> = ({ items, values, onChange, resize, placeholder = 'Filter...' }) => {
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
  const filteredItems = filterItems(items, f)
  const [currentValues, setValue] = useReducer(selectValuesReducer, values)
  const children = filteredItems.map((opt, i) => {
    return (
      <ContextOptionItem
        key={i}
        onChange={(v) => {
          setValue(v)
          onChange(selectValuesReducer(currentValues, v))
          if (resize) {
            resize()
          }
        }}
        option={opt}
        noRemove
        selected={currentValues.includes(opt.value)}
      />
    )
  })

  return (
    <>
      <FilterInputHolderSticky>
        <FilterInputMultiHolder>
          {/* <IconSearch color="$TextSecondary" /> */}
          {currentValues.map((v) => {
            return (
              <FilterSelectedBadge key={v}>
                <Text>{items.find((opt) => opt.value === v)?.label || v}</Text>
                <IconClose
                  onClick={() => {
                    setValue(v)
                    onChange(selectValuesReducer(currentValues, v))
                    if (resize) {
                      resize()
                    }
                  }}
                  css={{
                    marginLeft: 16,
                  }}
                />
              </FilterSelectedBadge>
            )
          })}
          <FilterMultiInput
            size={f ? f.length : placeholder.length}
            data-aviato-context-item
            placeholder={placeholder}
            onChange={onFilter}
          />
        </FilterInputMultiHolder>
      </FilterInputHolderSticky>
      {children}
    </>
  )
}

export const ContextMultiOptions: FC<
  ContextMultiOptionsProps & ContextOptionsFilterProps
> = ({ items = [], values, onChange, filterable, placeholder, resize }) => {
  if (filterable) {
    return (
      <FilterableContextMultiOptions
        items={items}
        values={values}
        onChange={onChange}
        filterable={filterable}
        resize={resize}
        placeholder={placeholder}
      />
    )
  } else {
    return (
      <ContextMultiItems items={items} onChange={onChange} values={values} />
    )
  }
}
