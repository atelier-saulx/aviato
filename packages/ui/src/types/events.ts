import { SyntheticEvent } from 'react'

export interface onChange<T = Event> {
  index?: number
  event?: T
}

export type PropsEventHandler<E = SyntheticEvent, P = any> = (
  e?: E,
  props?: P
) => void | Promise<void> | boolean | Promise<boolean>
