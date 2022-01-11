import { useContext } from 'react'
import { ToastContext } from './ToastContext'
export const useToast = () => {
  const toast = useContext(ToastContext)
  if (toast) {
    return toast
  }
  const noContext = () => {
    console.warn('No ToastContext found')
  }
  noContext.close = noContext
  return noContext
}
