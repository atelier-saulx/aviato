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
import { SelectLabel, StyledSelect } from './StyledSelect'

export type MultiSelectProps = {
  values?: Value[]
  options: (Option | Value)[]
  onChange: (values: Value[]) => void
  color?: Color
  filterable?: boolean | 'create'
  placeholder?: string
  label?: string
  overlay?: PositionProps
  css?: StitchedCSS
}

const StyledBadgeContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const StyledLabelContainer = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const MultiSelect: FC<MultiSelectProps> = ({
  options,
  values,
  onChange,
  css,
  filterable,
  color = '$TextPrimary',
  placeholder = 'Select options',
  overlay,
  label,
}) => {
  const ref = useRef()

  // if these values update force update on the dropdown
  const [currentValues, open, setValues] = useMultiSelect(options, values, {
    variant: 'over',
    filterable,
    placement: 'left',
    width: 'target',
    ...overlay,
  })

  const [displayIndex, setDisplayIndex] = useState(values?.length || 0)

  useEffect(() => {
    if (!deepEqual(currentValues, values)) {
      onChange(currentValues)
    }

    setDisplayIndex(currentValues.length)

    let handle: any

    const correctIt = (time = 0, cnt = 0) => {
      clearTimeout(handle)
      handle = setTimeout(() => {
        // @ts-ignore
        if (ref.current.children[0]?.children?.length) {
          // @ts-ignore
          const { width } = ref.current.getBoundingClientRect()
          // @ts-ignore
          const innerWidth = ref.current.children[0].clientWidth

          if (innerWidth > width - 80) {
            // width - 60
            let targetW = innerWidth
            for (
              // @ts-ignore
              let i = ref.current.children[0].children.length - 1;
              i >= 0;
              i--
            ) {
              // @ts-ignore
              const child = ref.current.children[0].children[i]
              if (!child.getAttribute('data-aviato-select-more')) {
                targetW -= child.getBoundingClientRect().width + 8
                if (targetW <= width - 80) {
                  setDisplayIndex(i)
                  correctIt(25)
                  break
                }
              }
            }
          } else {
            for (
              let i = 0;
              // @ts-ignore
              i < ref.current.children[0].children.length;
              i++
            ) {
              // @ts-ignore
              const child = ref.current.children[0].children[i]
              child.style.opacity = 1
            }
          }
          if (cnt < 3) {
            correctIt(25, ++cnt)
          }
        }
      }, time)
    }

    correctIt()

    return () => {
      clearTimeout(handle)
    }
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
          css={{ marginRight: 8, opacity: 0 }}
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
          css={{
            opacity: 0,
          }}
          number={currentValues.length - displayIndex}
          key={currentValues.length}
        />
      )
    }

    optionsBadges = <StyledBadgeContainer>{c}</StyledBadgeContainer>
  }

  if (label) {
    return (
      <SelectLabel label={label} onClick={open} css={css}>
        <StyledLabelContainer ref={ref}>
          {optionsBadges}
          <IconChevronDown color={color} />
        </StyledLabelContainer>
      </SelectLabel>
    )
  }

  return (
    <StyledSelect ref={ref} onClick={open} css={css}>
      {optionsBadges}
      <IconChevronDown color={color} />
    </StyledSelect>
  )
}
