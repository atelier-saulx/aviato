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

      floating: {},
    },
  },
})

export type ListType = 'simple' | 'complex' | 'floating'

export interface ListProps extends ComponentProps<typeof StyledList> {
  type?: ListType
  header?: ListItemProps
  footer?: ListItemProps
  isDraggable?: boolean
}

export const List = forwardRef<ElementRef<typeof StyledList>, ListProps>(
  (properties, forwardedRef) => {
    const {
      children,
      header,
      footer,
      type = header || footer ? 'complex' : 'simple',
      isDraggable = false,
      ...remainingProps
    } = properties

    const listItemChildren = Array.isArray(children) ? children : [children]
    // filterChildrenByType(children, ListItem)

    // console.info(children, listItemChildren)

    const listItems = listItemChildren.map((listItem, index) => {
      return (
        <ListItem
          {...listItem.props}
          key={`ListItem-${index}`}
          type={type}
          isFirstItem={index === 0}
          isDraggable={isDraggable}
          isLastItem={index === listItemChildren.length - 1}
        />
      )
    })

    const spacing = type === 'floating' ? 'sm' : 'none'

    return (
      <StyledList type={type} ref={forwardedRef} {...remainingProps}>
        <Conditional test={header}>
          <ListItem {...header} type="header" />
        </Conditional>

        <Group role="list" direction="horizontal" space={spacing}>
          {listItems}
        </Group>

        <Conditional test={footer}>
          <ListItem {...footer} type="footer" />
        </Conditional>
      </StyledList>
    )
  }
)

List.displayName = 'List'
