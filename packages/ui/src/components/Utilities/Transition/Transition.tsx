import React from 'react'
import { getTransitionStyles } from './utils'
import { TransitionPrimitive } from './transitions'
import { useTransition } from '~/hooks'

export interface TransitionProps {
  transition: TransitionPrimitive
  duration?: number
  exitDuration?: number
  timingFunction?: string
  mounted: boolean
  onExited?: () => void
  onExit?: () => void
  onEnter?: () => void
  onEntered?: () => void
  children: any
}

export function Transition({
  transition,
  duration = 250,
  exitDuration = duration,
  mounted,
  children,
  timingFunction,
  onExit,
  onEntered,
  onEnter,
  onExited,
}: TransitionProps) {
  const { transitionDuration, transitionStatus, transitionTimingFunction } =
    useTransition({
      mounted,
      exitDuration,
      duration,
      timingFunction,
      onExit,
      onEntered,
      onEnter,
      onExited,
    })

  if (transitionDuration === 0) {
    return mounted ? <>{children({})}</> : null
  }

  return transitionStatus === 'exited' ? null : (
    <>
      {children(
        getTransitionStyles({
          transition,
          duration: transitionDuration,
          state: transitionStatus,
          timingFunction: transitionTimingFunction,
        })
      )}
    </>
  )
}

Transition.displayName = 'Transition'
