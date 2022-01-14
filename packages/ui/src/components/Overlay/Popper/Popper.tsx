import React, { useState } from 'react'
import { usePopper, StrictModifier } from 'react-popper'
import type { Placement } from '@popperjs/core'
import { useDidUpdate } from '@aviato/hooks'

import { PopperContainer } from './Container'
import { flipPlacement, flipPosition } from './utils'
import { getZIndex } from '~/theme'

export interface SharedPopperProps {
  position?: 'top' | 'left' | 'bottom' | 'right'
  placement?: 'start' | 'center' | 'end'
  gutter?: number
  arrowSize?: number
  arrowDistance?: number
  withArrow?: boolean
  zIndex?: number
}

export interface PopperProps<T extends HTMLElement> extends SharedPopperProps {
  referenceElement: T
  children: React.ReactNode
  mounted: boolean
  arrowClassName?: string
  arrowStyle?: React.CSSProperties
  forceUpdateDependencies?: any[]
  onTransitionEnd?(): void
  modifiers?: StrictModifier[]
  withinPortal?: boolean
}

export function Popper<T extends HTMLElement = HTMLDivElement>({
  position = 'top',
  placement = 'center',
  gutter = 5,
  arrowSize = 2,
  withArrow = false,
  referenceElement,
  children,
  arrowStyle,
  zIndex = getZIndex('Popover'),
  forceUpdateDependencies = [],
  modifiers = [],
  withinPortal = true,
}: PopperProps<T>) {
  const padding = withArrow ? gutter + arrowSize : gutter
  const [popperElement, setPopperElement] = useState(null)
  const _placement = flipPlacement(placement, 'ltr')
  const _position = flipPosition(position, 'ltr')

  const initialPlacement: Placement =
    _placement === 'center' ? _position : `${_position}-${_placement}`

  const { styles, attributes, forceUpdate } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: initialPlacement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, padding],
          },
        },
        ...modifiers,
      ],
    }
  )

  useDidUpdate(() => {
    typeof forceUpdate === 'function' && forceUpdate()
  }, forceUpdateDependencies)

  return (
    <PopperContainer withinPortal={withinPortal} zIndex={zIndex}>
      <div
        ref={setPopperElement}
        style={{ ...styles.popper, pointerEvents: 'none' }}
        {...attributes.popper}
      >
        <div>
          {children}
          {withArrow && <div style={arrowStyle} />}
        </div>
      </div>
    </PopperContainer>
  )
}
