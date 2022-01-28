import React from 'react'
import PopperUnstyled from '@mui/base/PopperUnstyled'
import { Options } from '@popperjs/core'

import { useUuid } from '~/hooks'
import { BasePlacement, BasePosition, Placement } from './types'
import { flipPlacement, flipPosition } from './utils'
import { getZIndex, styled } from '~/theme'

const PopperElement = styled('div', {})

export interface SharedPopperProps {
  position?: BasePosition
  placement?: BasePlacement
  gutter?: number
  arrowSize?: number
  arrowDistance?: number
  withArrow?: boolean
}

export interface PopperProps<T extends HTMLElement> extends SharedPopperProps {
  referenceElement: T
  children: React.ReactNode
  mounted: boolean
  disablePortal?: boolean
  modifiers?: Options['modifiers']
  zIndex?: number
}

export function Popper<T extends HTMLElement = HTMLDivElement>({
  position = 'top',
  placement = 'center',
  gutter = 5,
  arrowSize = 2,
  withArrow = false,
  referenceElement,
  mounted,
  disablePortal = false,
  modifiers = [],
  zIndex = getZIndex('Popover'),
  children,
}: PopperProps<T>) {
  const padding = withArrow ? gutter + arrowSize : gutter

  const uuid = useUuid({ prefix: 'popper' })

  const internalPlacement = flipPlacement(placement, 'ltr')
  const internalPosition = flipPosition(position, 'ltr')

  const initialPlacement: Placement =
    internalPlacement === 'center'
      ? internalPosition
      : `${internalPosition}-${internalPlacement}`

  const popperModifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, padding],
      },
    },
    ...modifiers,
  ]

  return (
    <PopperUnstyled
      id={uuid}
      anchorEl={referenceElement}
      open={mounted}
      disablePortal={disablePortal}
      placement={initialPlacement}
      modifiers={popperModifiers}
    >
      <PopperElement css={{ zIndex }}>{children}</PopperElement>
    </PopperUnstyled>
  )
}

Popper.displayName = 'Popper'
