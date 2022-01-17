/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FunctionComponent, useCallback } from 'react'
import { noop } from '@aviato/utils'

import { onChange } from '~/types'
import { SelectItem } from './types'

export interface OnDropdownChange extends onChange {
  value: string | SelectItem
}

export interface DropdownMenuProps {
  items: SelectItem[]
  onChange?: (value: string, payload: OnDropdownChange) => void
}

export const DropdownMenu: FunctionComponent<DropdownMenuProps> = (
  properties
) => {
  const { items, onChange = noop } = properties

  const handleSelect = useCallback((event, { value, index }) => {
    onChange(value, { event, value, index })
  }, [])

  const MenuItems = items.map(({ value, label, disabled }, index) => (
    <p key={`DropdownItem-${value}-${index}`}>{label}</p>
  ))

  return <>{MenuItems}</>
}
