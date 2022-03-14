import React, { CSSProperties, ReactElement } from 'react'

import { useTransition } from '~/hooks'
import { TransitionPrimitive } from './transitions'
import { getTransitionStyles } from './utils'

interface GroupedTransitionItem {
  duration: number
  timingFunction?: CSSProperties['transitionTimingFunction']
  transition: TransitionPrimitive
}

export interface GroupedTransitionProps {
  transitions: Record<string, GroupedTransitionItem>
  children(styles: Record<string, CSSProperties>): ReactElement<any, any>
  duration?: number
  exitDuration?: number
  timingFunction?: string
  mounted: boolean
  onExited?: () => void
  onExit?: () => void
  onEnter?: () => void
  onEntered?: () => void
}

export function GroupedTransition({
  transitions,
  duration = 250,
  exitDuration = duration,
  mounted,
  children,
  timingFunction,
  onExit,
  onEntered,
  onEnter,
  onExited,
}: GroupedTransitionProps) {
  const { transitionDuration, transitionStatus, transitionTimingFunction } =
    useTransition({
      mounted,
      duration,
      exitDuration,
      timingFunction,
      onExit,
      onEntered,
      onEnter,
      onExited,
    })

  if (transitionDuration === 0) {
    return mounted ? <>{children({})}</> : null
  }

  if (transitionStatus === 'exited') {
    return null
  }

  const transitionsStyles = Object.keys(transitions).reduce(
    (accumulator, transition) => {
      accumulator[transition] = getTransitionStyles({
        duration: transitions[transition].duration,
        transition: transitions[transition].transition,
        timingFunction:
          transitions[transition].timingFunction || transitionTimingFunction,
        state: transitionStatus,
      })

      return accumulator
    },
    {}
  )

  return <>{children(transitionsStyles)}</>
}

GroupedTransition.displayName = 'GroupedTransition'
