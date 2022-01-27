import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { filterChildrenByType } from '@aviato/utils'

import { styled } from '~/theme'
import { ListItem } from './ListItem'
import { Group } from '~/components'

const StyledList = styled('div', {
  width: '100%',
  height: '100%',
  background: '$Background1dp',
  padding: 16,
  borderRadius: 4,
})

export interface ListProps extends ComponentProps<typeof StyledList> {}

export const List = forwardRef<ElementRef<typeof StyledList>, ListProps>(
  (properties, forwardedRef) => {
    const { children, ...remainingProps } = properties

    const listItemChildren = filterChildrenByType(children, ListItem)

    return (
      <StyledList ref={forwardedRef} {...remainingProps}>
        <Group role="list" direction="column" space="none">
          {listItemChildren.map((listItem, index) => {
            return <ListItem {...listItem.props} key={`ListItem-${index}`} />
          })}
        </Group>
      </StyledList>
    )
  }
)
