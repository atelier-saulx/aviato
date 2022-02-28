import { CSSProperties } from 'react'
import { TransitionPrimitive, transitions } from './transitions'

const transitionStatuses = {
  entering: 'in',
  entered: 'in',
  exiting: 'out',
  exited: 'out',
  'pre-exiting': 'out',
  'pre-entering': 'out',
} as const

export function getTransitionStyles({
  transition,
  state,
  duration,
  timingFunction,
}: {
  transition: TransitionPrimitive
  state: keyof typeof transitionStatuses
  duration: number
  timingFunction: CSSProperties['transitionTimingFunction']
}): CSSProperties {
  const shared = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction,
  }

  if (typeof transition === 'string') {
    if (!(transition in transitions)) {
      return null
    }

    return {
      transitionProperty: transitions[transition].transitionProperty,
      ...shared,
      ...transitions[transition].common,
      ...transitions[transition][transitionStatuses[state]],
    }
  }

  return {
    transitionProperty: transition.transitionProperty,
    ...shared,
    ...transition.common,
    ...transition[transitionStatuses[state]],
  }
}
