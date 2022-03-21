import { useContext } from 'react'

import { ToastContext, ToastContextType } from './ToastContext'

export const useToast: () => ToastContextType = () => {
  const toast = useContext<ToastContextType>(ToastContext)
  if (toast) {
    return toast
  }

  const noContext = () => {
    console.warn('No ToastContext found')
  }

  noContext.add = noContext as any
  noContext.close = noContext as any
  noContext.useCount = noContext as any

  return noContext
}
