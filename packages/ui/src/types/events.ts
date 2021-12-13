import { EventHandler, SyntheticEvent } from 'react'

export type GenericEventHandler = EventHandler<SyntheticEvent>

interface DefaultChangeEvent {
  event?: SyntheticEvent
}

export type OnValueChange<T extends DefaultChangeEvent> = (
  value: T,
  e?: Event | SyntheticEvent
) => void
