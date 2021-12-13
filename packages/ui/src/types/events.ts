import { SyntheticEvent } from 'react'

export type OnValueChange<T = any> = (
  value: T,
  index?: number,
  e?: Event | SyntheticEvent
) => void
