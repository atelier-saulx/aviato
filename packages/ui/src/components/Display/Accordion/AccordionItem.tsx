import React, { FunctionComponent, ReactNode, useContext, useRef } from 'react'

import { styled } from '~/theme'
import { Text } from '../../Text'
import { IconChevronDown } from '~/components/Icons/components'
import { AccordionContext } from './AccordionContext'
import { Conditional } from '~/components'

const ItemContainer = styled('div', {
  width: '100%',
  cursor: 'pointer',
  borderBottom: '1px solid $OtherDivider',
  '&:hover': {
    '>header': {
      background: '$ActionLightHover',
    },
  },
  '&:active': {
    '>header': {
      background: '$ActionLightSelected',
    },
  },
})

const ItemHeader = styled('header', {
  height: 40,
  display: 'flex',
  alignItems: 'center',
  variants: {
    state: {
      active: {
        backgroundColor: '$ActionLight',
      },
      inactive: {
        backgroundColor: null,
      },
    },
  },
})

const Icon = styled(IconChevronDown, {
  width: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  variants: {
    state: {
      active: {
        transform: 'rotate(180deg)',
      },
      inactive: {
        transform: 'rotate(360deg)',
      },
    },
  },
})

const Body = styled(Text, {
  paddingTop: 12,
  paddingBottom: 16,
  paddingLeft: 40,
})

export interface AccordionItemProps {
  title: string
  index: number
  active: boolean
  children: ReactNode
}

export const AccordionItem: FunctionComponent<AccordionItemProps> = (
  properties
) => {
  const { title, children, index = 0, active = false } = properties

  const { selected, toggle } = useContext(AccordionContext)
  const activeRef = useRef(false)

  if (activeRef.current !== active) {
    activeRef.current = active
    if (active) {
      selected.add(index)
    } else {
      selected.delete(index)
    }
  }

  const isActive = selected.has(index)
  const state = selected.has(index) ? 'active' : 'inactive'

  return (
    <ItemContainer onClick={() => toggle(index)}>
      <ItemHeader state={state}>
        <Icon state={state} />
        <Text weight="medium">{title}</Text>
      </ItemHeader>

      <Conditional test={isActive}>
        <Body>{children}</Body>
      </Conditional>
    </ItemContainer>
  )
}

AccordionItem.displayName = 'AccordionItem'
