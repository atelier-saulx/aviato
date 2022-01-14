import React, { FunctionComponent, useCallback } from 'react'
import * as Menu from '@radix-ui/react-dropdown-menu'
import { noop } from '@aviato/utils'

import { onChange } from '~/types'
import { styled } from '~/theme'
import { SelectItem } from './types'

const Root = styled(Menu.Root, {
  width: '100%',
})

const Content = styled(Menu.Content, {
  width: '100%',
  minWidth: 280,
  background: '$Background2dp',
  borderRadius: 4,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
})

const Trigger = styled(Menu.Trigger, {
  width: '100%',
})

const Item = styled(Menu.Item, {
  cursor: 'pointer',
  width: '100%',

  '&[data-disabled]': {
    color: '$TextDisabled',
  },
}) as typeof Menu.Item

export interface OnDropdownChange extends onChange {
  value: string | SelectItem
}

export interface DropdownMenuProps {
  items: SelectItem[]
  onChange?: (value: string, payload: OnDropdownChange) => void
  onOpenChange?: (isOpen: boolean) => void
}

export const DropdownMenu: FunctionComponent<DropdownMenuProps> = (
  properties
) => {
  const { items, onChange = noop, onOpenChange = noop, children } = properties

  const handleSelect = useCallback((event, { value, index }) => {
    onChange(value, { event, value, index })
  }, [])

  const MenuItems = items.map(({ value, label, disabled }, index) => (
    <Item
      key={`DropdownItem-${value}-${index}`}
      onSelect={(event) => handleSelect(event, { value, index })}
      disabled={disabled}
    >
      {label}
    </Item>
  ))

  return (
    <>
      <Root onOpenChange={onOpenChange}>
        <Trigger>{children}</Trigger>
        <Content align="start">{MenuItems}</Content>
      </Root>
    </>
  )
}
