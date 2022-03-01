import { transitions } from './transitions'

export * from './Transition'
export * from './GroupedTransition'

export type { TransitionProps } from './Transition'
export type { TransitionPrimitive } from './transitions'

export const AVAILABLE_TRANSITIONS = Object.keys(transitions) as Array<
  keyof typeof transitions
>
