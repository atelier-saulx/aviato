import React, { AriaRole, ReactNode } from 'react'
import Tippy from '@tippyjs/react/headless'
import { StrictModifiers } from '@popperjs/core'
import { noop } from '@aviato/utils'

import { BasePlacement, BasePosition, Placement } from './types'
import { flipPlacement, flipPosition } from './utils'
import { getZIndex } from '~/theme'
import {
  Transition,
  TransitionPrimitive,
} from '~/components/Utilities/Transition'

export interface SharedPopoverProps {
  position?: BasePosition
  placement?: BasePlacement
  role?: AriaRole
  padding?: number
  transition?: TransitionPrimitive
  transitionDuration?: number
  exitTransitionDuration?: number
  transitionTimingFunction?: string
}

export interface PopoverProps<T extends HTMLElement>
  extends SharedPopoverProps {
  referenceElement: T
  mounted: boolean
  zIndex?: number
  modifiers?: StrictModifiers[]
  onTransitionEnd?(): void
  children: ReactNode
}

export function Popover<T extends HTMLElement = HTMLDivElement>({
  referenceElement,
  position = 'top',
  placement = 'center',
  mounted,
  zIndex = getZIndex('Popover'),
  role = 'tooltip',
  padding = 8,
  modifiers = [],
  transition = 'none',
  transitionDuration = 0,
  exitTransitionDuration = transitionDuration,
  transitionTimingFunction,
  onTransitionEnd = noop,
  children,
}: PopoverProps<T>) {
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

  const popperOptions = {
    modifiers: popperModifiers,
  }

  /**
   * Unmount Tippy instance after animation ends
   */
  let unmountTippyInstance = () => {}

  return (
    <Transition
      mounted={mounted && !!referenceElement}
      duration={transitionDuration}
      exitDuration={exitTransitionDuration}
      transition={transition}
      timingFunction={transitionTimingFunction}
      onExited={() => {
        unmountTippyInstance()
        onTransitionEnd()
      }}
    >
      {(transitionStyles) => (
        <Tippy
          reference={referenceElement}
          placement={initialPlacement}
          visible={mounted}
          zIndex={zIndex}
          role={role}
          popperOptions={popperOptions}
          animation
          onHide={(instance) => {
            unmountTippyInstance = instance.unmount
          }}
          render={(attributes) => (
            <div tabIndex={-1} {...attributes}>
              <div style={transitionStyles}>{children}</div>
            </div>
          )}
        />
      )}
    </Transition>
  )
}

Popover.displayName = 'Popper'
