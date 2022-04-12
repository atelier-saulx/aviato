import React, { useState, useEffect, useRef, ReactNode } from 'react'

import { DialogContext, DialogContextType } from './DialogContext'
import { addOverlay, Backdrop, Input, removeOverlay } from '~/components'
import { Dialog } from './Dialog'
import { removeAllOverlays } from '..'

const Prompt = ({ type = 'prompt', onCancel, onConfirm, ...props }) => {
  const ref = useRef<HTMLInputElement>()
  const isPrompt = type === 'prompt'
  const isAlert = type === 'alert'

  return (
    <Dialog mode="dialog" {...props}>
      {isPrompt ? (
        <Dialog.Body>
          <Input autoFocus ref={ref} />
        </Dialog.Body>
      ) : null}
      <Dialog.Buttons>
        {isAlert ? null : <Dialog.Cancel onCancel={onCancel} />}
        <Dialog.Confirm
          onConfirm={() =>
            isPrompt ? onConfirm(ref.current.value) : onConfirm(true)
          }
        />
      </Dialog.Buttons>
    </Dialog>
  )
}

interface DialogItem {
  id: number
  children: ReactNode
}

export const DialogProvider = ({ children, fixed = true }) => {
  const dialogsRef = useRef<DialogItem[]>()
  const dialogRef = useRef<DialogContextType>()

  if (!dialogRef.current) {
    let count = 0
    const listeners = new Set<React.Dispatch<React.SetStateAction<number>>>()
    const update = (length) => {
      listeners.forEach((fn) => fn(length))
    }

    const dialog = (children, onClose = null) => {
      const id = count++
      // this is only used internally
      dialog._id = id

      children = (
        <Backdrop
          key={id}
          // TODO please don't make backgdrop use portal!
          disablePortal
          css={{
            position: fixed ? 'fixed' : 'absolute',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={(event) => {
            if (event.currentTarget === event.target) {
              dialogRef.current.close(id)
            }
          }}
        >
          {children}
        </Backdrop>
      )

      requestAnimationFrame(() => {
        addOverlay(children, onClose)
        update(
          dialogsRef.current.push({
            id,
            children,
          })
        )
      })

      return id
    }

    dialog._id = null

    const prompt = (type, props) => {
      return new Promise((resolve) => {
        if (typeof props === 'string') {
          props = {
            title: props,
          }
        }

        dialog.open(<Prompt {...props} type={type} onConfirm={resolve} />, () =>
          resolve(false)
        )
      })
    }

    dialog.open = dialog

    dialog.close = (id) => {
      if (typeof id === 'number') {
        const index = dialogsRef.current.findIndex(
          ({ id: dialogId }) => dialogId === id
        )
        if (index !== -1) {
          const removed = dialogsRef.current.splice(index, 1)
          const { length } = dialogsRef.current
          dialog._id = length ? dialogsRef.current[length - 1].id : null
          update(length)
          removeOverlay(removed?.[0].children)
        }
      } else {
        dialogsRef.current = []
        dialog._id = null
        update(0)
        removeAllOverlays()
      }
    }

    dialog.prompt = (props) => prompt('prompt', props)
    dialog.alert = (props) => prompt('alert', props)
    dialog.confirm = (props) => prompt('confirm', props)

    dialog.useCount = () => {
      const [state, setState] = useState(dialogsRef.current.length)

      useEffect(() => {
        listeners.add(setState)
        return () => {
          listeners.delete(setState)
        }
      }, [])

      return state
    }

    // @ts-ignore
    dialogRef.current = dialog
    dialogsRef.current = []
  }

  return (
    <DialogContext.Provider value={dialogRef.current}>
      {children}
    </DialogContext.Provider>
  )
}
