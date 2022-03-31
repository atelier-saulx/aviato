import {
  SyntheticEvent,
  ReactChild,
  ReactChildren,
  ComponentType,
  ReactText,
  PropsWithChildren,
  ReactNode,
} from 'react'

export type File = {
  content: any
  mime: string
  name: string
}

export type PropsEventHandler<T = any> = (
  e?: Event | SyntheticEvent,
  props?: T
) => void | Promise<void> | boolean | Promise<boolean>

// use this
export type AsyncEvent = (e: Event | SyntheticEvent) => void | Promise<void>

export type Children<T = PropsWithChildren<any>> =
  | ReactChild
  | ReactChildren
  | ComponentType<T>
  | ReactText
  | ReactText[]
  | ReactNode
  | ReactNode[]
  | number
  | string
  | number[]
  | string[]
