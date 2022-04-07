import React, {
  FC,
  useCallback,
  useState,
  forwardRef,
  ElementRef,
  useReducer,
  SyntheticEvent,
} from 'react'
import { removeOverlay } from '~/components/Overlay'
import { IconCheck, IconSearch, IconClose, Text, IconPlus } from '~/components'
import { Color, styled, StitchedCSS } from '~/theme'
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
  // eslint-disable-next-line
  filterable?: boolean
  placeholder?: string
  resize?: () => void
  // eslint-disable-next-line
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
    noInset?: boolean
  }
>(
  (
    { option, onChange, selected, tabIndex, noRemove, noInset },
    forwardedRef
  ) => {
    const [isSelected, setIsSelected] = useState(0)

    if (option.value === '$-no-results-aviato') {
      return (
        <ContextItem inset={!noInset} noFocus color="$TextSecondary">
          {option.label}
        </ContextItem>
      )
    }

    return (
      <ContextItem
        inset={!noInset}
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
        leftIcon={!noInset && selected ? <IconCheck /> : null}
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
  }
)

const filterItems = (
  items: Option[],
  filter?: string,
  values?: Value[]
): Option[] => {
  if (filter) {
    items = items.filter((opt) => {
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

    if (items.length === 0) {
      return [{ value: '$-no-results-aviato', label: 'No results' }]
    }
  }

  if (values) {
    items = items.filter((opt) => {
      return !values.includes(opt.value)
    })

    if (items.length === 0) {
      return [{ value: '$-no-results-aviato', label: 'No options left' }]
    }
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
  const [currentValue, setValue] = useState(value)
  const children = items.map((opt, i) => {
    return (
      <ContextOptionItem
        key={i}
        onChange={(v) => {
          if (v === currentValue) {
            setValue(undefined)
            onChange(undefined)
          } else {
            setValue(v)
            onChange(v)
          }
        }}
        option={opt}
        selected={currentValue === opt.value}
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
  paddingTop: 2,
  borderTopLeftRadius: 4,
  paddingLeft: 4,
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

const StyledFilterSelectedBadge = styled('div', {
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: 4,
  userSelect: 'none',
  marginTop: 4,
  flexShrink: 0,
  borderRadius: 4,
  paddingLeft: 8,
  color: '$TextPrimary',
  paddingRight: 8,
  backgroundColor: '$ActionLight',
})

export const FilterSelectBadge: FC<{
  label: string | React.ReactNode
  onClose: () => void
  color?: Color
  css?: StitchedCSS
}> = ({ label, onClose, color = 'inherit', css }) => {
  if (color) {
    if (!css) {
      css = { color }
    } else {
      css.color = color
    }
  }
  return (
    <StyledFilterSelectedBadge css={css}>
      <Text>{label}</Text>
      <IconClose
        onClick={onClose}
        css={{
          flexShrink: 0,
          marginLeft: 8,
        }}
      />
    </StyledFilterSelectedBadge>
  )
}

export const FilterSelectMoreBadge: FC<{
  onClick?: (e: SyntheticEvent) => void
  number: number
  color?: Color
  css?: StitchedCSS
}> = ({ number, onClick, color = 'inherit', css }) => {
  // make a function for this
  if (color) {
    if (!css) {
      css = { color }
    } else {
      css.color = color
    }
  }
  return (
    <StyledFilterSelectedBadge css={css} data-aviato-select-more>
      <IconPlus css={{ marginRight: 8 }} onClick={onClick} />
      <Text>{number}</Text>
    </StyledFilterSelectedBadge>
  )
}

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
  const [currentValues, setValue] = useReducer(selectValuesReducer, values)

  const filteredItems = filterItems(items, f, currentValues)
  const children = filteredItems.map((opt, i) => {
    return (
      <ContextOptionItem
        key={i}
        noInset
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
          {currentValues.map((v) => {
            return (
              <FilterSelectBadge
                css={{ marginLeft: 8 }}
                key={v}
                label={items.find((opt) => opt.value === v)?.label || v}
                onClose={() => {
                  setValue(v)
                  onChange(selectValuesReducer(currentValues, v))
                  if (resize) {
                    resize()
                  }
                }}
              />
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
