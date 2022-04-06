import { createContext, ReactNode } from 'react'

export type DialogContextType = {
  open: (children: ReactNode) => number
  close: (id?: number) => void
  confirm: (id?: string | number) => boolean
  alert: (id?: string | number) => boolean
  prompt: (id?: string | number) => boolean | string
  useCount: () => number
  _id: number
}

export const DialogContext = createContext<DialogContextType>(undefined)
