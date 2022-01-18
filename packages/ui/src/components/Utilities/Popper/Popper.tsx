import React, { useState } from 'react'
import { usePopper, StrictModifier } from 'react-popper'
import { useDidUpdate } from '@aviato/hooks'
import { noop } from '@aviato/utils'

import { PopperContainer } from './Container'
import { flipPlacement, flipPosition, parsePopperPosition } from './utils'
import { classNames, getZIndex, styled } from '~/theme'
import { Conditional } from '~/components'
import { Transition, TransitionPrimitive } from '../Transition'
import { BasePlacement, BasePosition, Placement } from './types'

const PopperElement = styled('div', {})
const Arrow = styled('div', {})

export interface SharedPopperProps {
  position?: BasePosition
  placement?: BasePlacement
  gutter?: number
  arrowSize?: number
  arrowDistance?: number
  withArrow?: boolean
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
  arrowClassName?: string
  arrowStyle?: React.CSSProperties
  forceUpdateDependencies?: any[]
  onTransitionEnd?(): void
  modifiers?: StrictModifier[]
  withinPortal?: boolean
  onTransitionEnd?(): void
}

export function Popper<T extends HTMLElement = HTMLDivElement>({
  position = 'top',
  placement = 'center',
  gutter = 5,
  arrowSize = 2,
  withArrow = false,
  referenceElement,
  arrowStyle,
  zIndex = getZIndex('Popover'),
  forceUpdateDependencies = [],
  modifiers = [],
  withinPortal = true,
  mounted,
  transition = 'pop-top-left',
  transitionDuration = 0,
  exitTransitionDuration = transitionDuration,
  transitionTimingFunction,
  onTransitionEnd = noop,
  children,
}: PopperProps<T>) {
  const padding = withArrow ? gutter + arrowSize : gutter
  const [popperElement, setPopperElement] = useState(null)

  const internalPlacement = flipPlacement(placement, 'ltr')
  const internalPosition = flipPosition(position, 'ltr')

  const initialPlacement: Placement =
    internalPlacement === 'center'
      ? internalPosition
      : `${internalPosition}-${internalPlacement}`

  const popperOptions = {
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

  const { styles, attributes, forceUpdate } = usePopper(
    referenceElement,
    popperElement,
    popperOptions
  )

  useDidUpdate(() => {
    typeof forceUpdate === 'function' && forceUpdate()
  }, forceUpdateDependencies)

  const parsedAttributes = parsePopperPosition(
    attributes.popper?.['data-popper-placement']
  )

  const classes = classNames({
    [`${parsedAttributes.placement}`]: true,
    [`${parsedAttributes.position}`]: true,
  })

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
        <div>
          <PopperContainer withinPortal={withinPortal} zIndex={zIndex}>
            <PopperElement
              ref={setPopperElement}
              style={{ ...styles.popper, pointerEvents: 'none' }}
              {...attributes.popper}
            >
              <div style={transitionStyles}>
                {children}

                <Conditional test={withArrow}>
                  <Arrow style={arrowStyle} className={classes} />
                </Conditional>
              </div>
            </PopperElement>
          </PopperContainer>
        </div>
      )}
    </Transition>
  )
}
