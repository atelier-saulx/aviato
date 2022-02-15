import React, { forwardRef, ElementRef, ComponentProps } from 'react'

import { IconCheck } from '~/components/Icons/components'

import { StitchedCSS, styled } from '~/theme'
import { Badge, BadgeType, BadgeVariant } from '../Badge'

const Container = styled('div', {})

const IconContainer = styled('div', {
  color: '$PrimaryMain',
})

export type ChipType = 'light' | 'outlined'

export interface ChipItemProps extends ComponentProps<typeof Container> {
  value: string
  isSelected?: boolean
  type?: ChipType
}

export const ChipItem = forwardRef<ElementRef<typeof Badge>, ChipItemProps>(
  (properties, forwardedRef) => {
    const {
      type: chipType = 'light',
      isSelected = false,
      ...remainingProps
    } = properties

    const checkedIcon = (
      <IconContainer>
        <IconCheck />
      </IconContainer>
    )

    const leftArea = isSelected ? checkedIcon : null

    function getBadgeType(chipType: ChipType, isSelected: boolean): BadgeType {
      if (isSelected) {
        return chipType === 'light' ? 'primary' : 'primary'
      } else {
        return chipType === 'light' ? 'action' : 'action'
      }
    }

    function getBadgeVariant(
      chipType: ChipType,
      isSelected: boolean
    ): BadgeVariant {
      if (isSelected) {
        return chipType === 'light' ? 'light' : 'outlined'
      } else {
        return chipType === 'light' ? 'filled' : 'outlined'
      }
    }

    const badgeType = getBadgeType(chipType, isSelected)
    const badgeVariant = getBadgeVariant(chipType, isSelected)

    const ChipCSS: StitchedCSS = {
      cursor: 'pointer',
      color: '$TextPrimary !important',
    }

    return (
      <Badge
        type={badgeType}
        variant={badgeVariant}
        leftArea={leftArea}
        ref={forwardedRef}
        css={ChipCSS}
        {...remainingProps}
      />
    )
  }
)

ChipItem.displayName = 'ChipItem'
