import { createContext, ReactNode } from 'react'

type open = (children: ReactNode) => number

export type DialogContextType = open & {
  open
  close: (id?: number) => void
  confirm: (id?: string | number) => boolean
  alert: (id?: string | number) => boolean
  prompt: (id?: string | number) => boolean | string
  useCount: () => number
  _id: number
}

export const DialogContext = createContext<DialogContextType>(undefined)
