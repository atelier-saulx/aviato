import { useContext } from 'react'

import { DialogContext, DialogContextType } from './DialogContext'

export const useDialog: () => DialogContextType = () => {
  const Dialog = useContext(DialogContext)
  if (Dialog) {
    return Dialog
  }

  const noContext = () => {
    console.warn('No DialogContext found')
  }

  noContext.add = noContext as any
  noContext.close = noContext as any
  noContext.confirm = noContext as any
  noContext.alert = noContext as any
  noContext.prompt = noContext as any
  noContext.getAmount = noContext as any

  return noContext
}
