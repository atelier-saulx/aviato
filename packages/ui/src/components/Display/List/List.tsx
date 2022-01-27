import React, { forwardRef, ElementRef, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'
import { filterChildrenByType } from '@aviato/utils'

import { styled } from '~/theme'
import { ListItem } from './ListItem'
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

export interface ListHeader {
  title: string
  leftArea?: ReactNode
  rightArea?: ReactNode
}

export interface ListProps extends ComponentProps<typeof StyledList> {
  type?: ListType
  header?: ListHeader
}

export const List = forwardRef<ElementRef<typeof StyledList>, ListProps>(
  (properties, forwardedRef) => {
    const {
      children,
      header,
      type = header ? 'complex' : 'simple',
      ...remainingProps
    } = properties

    const { title, leftArea, rightArea } = header ?? {}

    const listItemChildren = filterChildrenByType(children, ListItem)

    const listItems = listItemChildren.map((listItem, index) => {
      return (
        <ListItem {...listItem.props} key={`ListItem-${index}`} type={type} />
      )
    })

    return (
      <StyledList ref={forwardedRef} {...remainingProps} type={type}>
        <Conditional test={header}>
          <ListItem leftArea={leftArea} rightArea={rightArea} type="header">
            {title}
          </ListItem>
        </Conditional>

        <Group role="list" direction="column" space="none">
          {listItems}
        </Group>
      </StyledList>
    )
  }
)
