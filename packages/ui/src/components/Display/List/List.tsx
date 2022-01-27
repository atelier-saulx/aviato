import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { filterChildrenByType } from '@aviato/utils'

import { styled } from '~/theme'
import { ListItem, ListItemProps } from './ListItem'
import { Conditional, Group } from '~/components'

const StyledList = styled('div', {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  background: '$Background1dp',

  variants: {
    type: {
      simple: {
        padding: 16,
        borderRadius: 4,
        background: '$Background1dp',
      },

      complex: {
        borderRadius: 4,
        border: '1px solid $OtherDivider',
      },
    },
  },
})

export type ListType = 'simple' | 'complex'

export interface ListProps extends ComponentProps<typeof StyledList> {
  type?: ListType
  header?: ListItemProps
  footer?: ListItemProps
}

export const List = forwardRef<ElementRef<typeof StyledList>, ListProps>(
  (properties, forwardedRef) => {
    const {
      children,
      header,
      footer,
      type = header || footer ? 'complex' : 'simple',
      ...remainingProps
    } = properties

    const listItemChildren = filterChildrenByType(children, ListItem)

    const listItems = listItemChildren.map((listItem, index) => {
      return (
        <ListItem
          {...listItem.props}
          key={`ListItem-${index}`}
          type={type}
          isFirstItem={index === 0}
          isLastItem={index === listItemChildren.length - 1}
        />
      )
    })

    return (
      <StyledList type={type} ref={forwardedRef} {...remainingProps}>
        <Conditional test={header}>
          <ListItem {...header} type="header" />
        </Conditional>

        <Group role="list" direction="column" space="none">
          {listItems}
        </Group>

        <Conditional test={footer}>
          <ListItem {...footer} type="footer" />
        </Conditional>
      </StyledList>
    )
  }
)
