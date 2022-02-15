import React, { useState } from 'react'
import { usePopper, StrictModifier } from 'react-popper'
import { useDidUpdate } from '~/hooks'
import { noop } from '@aviato/utils'

import { flipPlacement, flipPosition } from './utils'
import { getZIndex, styled } from '~/theme'
import { Portal } from '~/components/Utilities/Portal'
import { Transition, TransitionPrimitive } from '../Transition'
import { BasePlacement, BasePosition, Placement } from './types'

const Container = styled('div', {
  position: 'relative',
})

const PopperElement = styled('div', {})

export interface SharedPopperProps {
  position?: BasePosition
  placement?: BasePlacement
  gutter?: number
  zIndex?: number
  transition?: TransitionPrimitive
  transitionDuration?: number
  exitTransitionDuration?: number
  transitionTimingFunction?: string
}

export interface PopperProps<T extends HTMLElement> extends SharedPopperProps {
  referenceElement: T
  children: React.ReactNode
  mounted: boolean
  forceUpdateDependencies?: any[]
  onTransitionEnd?(): void
  modifiers?: StrictModifier[]
  disablePortal?: boolean
  onTransitionEnd?(): void
}

export function Popper<T extends HTMLElement = HTMLDivElement>({
  position = 'top',
  placement = 'center',
  gutter = 5,
  referenceElement,
  zIndex = getZIndex('Popover'),
  forceUpdateDependencies = [],
  modifiers = [],
  disablePortal = false,
  mounted,
  transition = 'fade',
  transitionDuration = 0,
  exitTransitionDuration = transitionDuration,
  transitionTimingFunction,
  onTransitionEnd = noop,
  children,
}: PopperProps<T>) {
  const padding = gutter
  const [popperElement, setPopperElement] = useState(null)

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
    placement: initialPlacement,
    modifiers: baseModifiers,
  }

  const {
    styles: popperStyles,
    attributes,
    forceUpdate,
  } = usePopper(referenceElement, popperElement, popperOptions)

  useDidUpdate(() => {
    typeof forceUpdate === 'function' && forceUpdate()
  }, forceUpdateDependencies)

  return (
    <Transition
      mounted={mounted && !!referenceElement}
      duration={transitionDuration}
      exitDuration={exitTransitionDuration}
      transition={transition}
      timingFunction={transitionTimingFunction}
      onExited={onTransitionEnd}
    >
      {(transitionStyles) => (
        <Container>
          <Portal disablePortal={disablePortal} zIndex={zIndex}>
            <PopperElement
              ref={setPopperElement}
              style={{
                ...popperStyles.popper,
                display: 'block',
                pointerEvents: 'none',
                position: 'fixed',
              }}
              {...attributes.popper}
            >
              <div style={transitionStyles}>{children}</div>
            </PopperElement>
          </Portal>
        </Container>
      )}
    </Transition>
  )
}

Popper.displayName = 'Popper'
