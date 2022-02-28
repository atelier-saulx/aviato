import React, { AriaRole, ReactNode } from 'react'
import Tippy from '@tippyjs/react/headless'
import { StrictModifiers } from '@popperjs/core'

import { BasePlacement, BasePosition, Placement } from './types'
import { flipPlacement, flipPosition } from './utils'
import { getZIndex, styled } from '~/theme'

const PopperElement = styled('div', {})

export interface SharedPopperProps {
  position?: BasePosition
  placement?: BasePlacement
  role?: AriaRole
  padding?: number
}

export interface PopperProps<T extends HTMLElement> extends SharedPopperProps {
  referenceElement: T
  mounted: boolean
  zIndex?: number
  modifiers?: StrictModifiers[]
  children: ReactNode
}

export function Popper<T extends HTMLElement = HTMLDivElement>({
  referenceElement,
  position = 'top',
  placement = 'center',
  mounted,
  zIndex = getZIndex('Popover'),
  role = 'tooltip',
  padding = 8,
  modifiers = [],
  children,
}: PopperProps<T>) {
  const internalPlacement = flipPlacement(placement, 'ltr')
  const internalPosition = flipPosition(position, 'ltr')

  const initialPlacement: Placement =
    internalPlacement === 'center'
      ? internalPosition
      : `${internalPosition}-${internalPlacement}`

  const baseModifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, padding],
      },
    },
    ...modifiers,
  ]

  const popperOptions = {
    modifiers: baseModifiers,
  }

  return (
    <Tippy
      reference={referenceElement}
      placement={initialPlacement}
      visible={mounted}
      zIndex={zIndex}
      role={role}
      popperOptions={popperOptions}
      render={(attrs) => (
        <PopperElement tabIndex={-1} style={{ zIndex }} {...attrs}>
          {children}
        </PopperElement>
      )}
    />
  )
}

Popper.displayName = 'Popper'
