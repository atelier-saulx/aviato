import React, { forwardRef, ElementRef } from 'react'
import { IconCheck } from '~/components'

import { styled } from '~/theme'
import { Badge, BadgeProps } from '../Badge'

const Container = styled('div', {
  cursor: 'pointer',
})

export interface ChipItemProps extends BadgeProps {
  isSelected?: boolean
  value: string
}

export const ChipItem = forwardRef<ElementRef<typeof Badge>, ChipItemProps>(
  (properties, forwardedRef) => {
    const { type = 'action', isSelected, ...remainingProps } = properties

    const leftArea = isSelected ? <IconCheck /> : null

    return (
      <Container>
        <Badge
          type={type}
          leftArea={leftArea}
          ref={forwardedRef}
          {...remainingProps}
        />
      </Container>
    )
  }
)

ChipItem.displayName = 'ChipItem'
