import { useContext } from 'react'

import { DialogContext, DialogContextType } from './DialogContext'

// @ts-ignore - TODO: yuzi fix this - we use types - add a provider on top
export const useDialog: () => DialogContextType = () => {
  const Dialog = useContext(DialogContext)
  if (Dialog) {
    return Dialog
  }

  const noContext = () => {
    console.warn('No DialogContext found')
  }

  noContext.open = noContext as any
  noContext.close = noContext as any
  noContext.confirm = noContext as any
  noContext.alert = noContext as any
  noContext.prompt = noContext as any
  noContext.useCount = noContext as any

  return noContext
}
