import {
  ReactChild,
  ReactChildren,
  ComponentType,
  Component,
  ReactText,
  PropsWithChildren,
  ReactNode,
} from 'react'

export * from './events'
export * from './sizes'
export * from './overlay'

export type File = {
  content: any
  mime: string
  name: string
}

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

export const isComponent = (children: any): children is ComponentType =>
  typeof children === 'function' || children instanceof Component
