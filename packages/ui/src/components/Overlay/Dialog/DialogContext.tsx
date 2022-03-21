import { createContext, ReactNode } from 'react'

export interface DialogContextType {
  open: (children: ReactNode) => number
  close: (id?: number) => void
  confirm: (id?: string | number) => boolean
  alert: (id?: string | number) => void
  prompt: (id?: string | number) => void
  useCount: () => number
  _id: number
}

export const DialogContext = createContext<DialogContextType>(undefined)
