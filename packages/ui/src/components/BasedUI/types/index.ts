import { TextValue } from '../textParser'
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

export type Data<T = {}> = T & {
  data: any
  index?: number
  exportData?: ExportData
}

export type DataEventHandler<T = {}> = (
  e?: Event | SyntheticEvent,
  data?: Data<T>
) => void | Promise<void> | boolean | Promise<boolean>

export type AsyncEvent = (e: Event | SyntheticEvent) => void | Promise<void>

export type MultiDataEventHandler<T = {}> = (
  e: Event | SyntheticEvent,
  data?: Data<T>[]
) => void | Promise<void>

export type OnValueChange<T = any> = (
  value: T,
  index?: number,
  e?: Event | SyntheticEvent
) => void

export type Timestamp = number

export type ExportedData = {
  file?: {
    value: any
    name: string
    mime: string
  }
  text?: TextValue
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

export type ExportData<T = any> = (data: Data<T>) => Promise<ExportedData>
