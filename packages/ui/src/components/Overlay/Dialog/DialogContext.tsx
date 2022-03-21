import { createContext, ReactNode } from 'react'

export interface DialogContextType {
  add: (children: ReactNode) => string | number
  close: (id?: string | number) => void
  confirm: (id?: string | number) => void
  alert: (id?: string | number) => void
  prompt: (id?: string | number) => void
  useCount: () => number
}

export const DialogContext = createContext<DialogContextType>(undefined)
