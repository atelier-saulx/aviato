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

  noContext.add = noContext as ToastContextType['add']
  noContext.close = noContext as ToastContextType['close']
  noContext.getAmount = noContext as any

  return noContext
}
