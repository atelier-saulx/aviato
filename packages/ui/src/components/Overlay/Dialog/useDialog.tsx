import { useContext } from 'react'
import { DialogContext } from './DialogContext'
export const useDialog = () => {
  const Dialog = useContext(DialogContext)
  if (Dialog) {
    return Dialog
  }
  const noContext = () => {
    console.warn('No DialogContext found')
  }
  noContext.close = noContext
  noContext.confirm = noContext
  noContext.alert = noContext
  noContext.prompt = noContext
  return noContext
}
