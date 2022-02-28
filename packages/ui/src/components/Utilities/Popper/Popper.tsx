import React, { ReactNode } from 'react'
import Tippy from '@tippyjs/react/headless'

import { BasePlacement, BasePosition, Placement } from './types'
import { flipPlacement, flipPosition } from './utils'
import { getZIndex, styled } from '~/theme'

const PopperElement = styled('div', {})

export interface SharedPopperProps {
  position?: BasePosition
  placement?: BasePlacement
}

export interface PopperProps<T extends HTMLElement> extends SharedPopperProps {
  referenceElement: T
  mounted: boolean
  zIndex?: number
  children: ReactNode
}

export function Popper<T extends HTMLElement = HTMLDivElement>({
  referenceElement,
  position = 'top',
  placement = 'center',
  mounted,
  zIndex = getZIndex('Popover'),
  children,
}: PopperProps<T>) {
  const internalPlacement = flipPlacement(placement, 'ltr')
  const internalPosition = flipPosition(position, 'ltr')

  const initialPlacement: Placement =
    internalPlacement === 'center'
      ? internalPosition
      : `${internalPosition}-${internalPlacement}`

  return (
    <Tippy
      reference={referenceElement}
      placement={initialPlacement}
      visible={mounted}
      render={(attrs) => (
        <PopperElement tabIndex={-1} style={{ zIndex }} {...attrs}>
          {children}
        </PopperElement>
      )}
    />
  )
}

Popper.displayName = 'Popper'
