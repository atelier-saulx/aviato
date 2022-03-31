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

// props is for later...
export type PropsEventHandler<E = SyntheticEvent, P = any> = (
  e?: E,
  props?: P
) => void | Promise<void> | boolean | Promise<boolean>

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
