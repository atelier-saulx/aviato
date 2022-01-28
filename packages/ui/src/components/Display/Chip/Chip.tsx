import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { filterChildrenByType, noop } from '@aviato/utils'

import { useUncontrolled } from '~/hooks'
import { styled } from '~/theme'
import { Group } from '~/components'
import { ChipItem } from './ChipItem'

const StyledChip = styled('div', {})

type StitchedProps = Omit<ComponentProps<typeof StyledChip>, 'onChange'>

export interface ChipProps extends StitchedProps {
  /**
   * Allow multiple values to be picked
   */
  multiple?: boolean

  /**
   * Controlled component value
   */
  value?: string[] | string

  /**
   * Uncontrolled component value
   */
  defaultValue?: string[] | string

  /**
   * Called when value changes
   */
  onChange?(value: string[] | string): void
}

export const Chip = forwardRef<ElementRef<typeof StyledChip>, ChipProps>(
  (properties, forwardedRef) => {
    const {
      value,
      defaultValue,
      multiple,
      onChange = noop,
      children,
      ...remainingProps
    } = properties

    const chipChildren = filterChildrenByType(children, ChipItem)

    const getDefaultValue = () => {
      if (multiple) {
        return []
      } else {
        return chipChildren[0].props.value ?? null
      }
    }

    const [selected, setSelected] = useUncontrolled({
      value,
      defaultValue,
      finalValue: getDefaultValue(),
      onChange,
      rule: (value) => {
        if (multiple) {
          return Array.isArray(value)
        }

        return typeof value === 'string'
      },
    })

    const setSelectedValue = (value: string) => {
      const selectedValue = selected.includes(value)
        ? selected.filter((filterValue) => filterValue !== value)
        : [...selected, value]

      setSelected(selectedValue)
    }

    const mappedChips = chipChildren.map((chip, index) => {
      return (
        <ChipItem
          {...chip.props}
          key={`ChipItem-${index}`}
          isSelected={
            Array.isArray(selected)
              ? selected.includes(chip.props.value)
              : chip.props.value === selected
          }
          onClick={() => {
            const { value } = chip.props ?? {}

            if (Array.isArray(selected)) {
              setSelectedValue(value)
            } else {
              setSelected(value)
            }
          }}
        />
      )
    })

    return (
      <StyledChip ref={forwardedRef} {...remainingProps}>
        <Group direction="row">{mappedChips}</Group>
      </StyledChip>
    )
  }
)

Chip.displayName = 'Chip'
