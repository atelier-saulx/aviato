import React, { useState, useEffect, useRef, ReactNode } from 'react'

import { DialogContext, DialogContextType } from './DialogContext'
import { Backdrop, Input } from '~/components'
import { Dialog } from './Dialog'
import { useHotkeys, HotkeyItem } from '~/hooks'

const Prompt = ({
  type = 'prompt',
  onCancel,
  onConfirm,
  hotKeys = ['enter'],
  ...props
}) => {
  const ref = useRef<HTMLInputElement>()
  const isPrompt = type === 'prompt'
  const isAlert = type === 'alert'
  const confirm = isPrompt ? () => onConfirm(ref.current.value) : onConfirm

  useHotkeys([
    ...hotKeys.map((key) => [key, confirm] as HotkeyItem),
    ['escape', onCancel],
  ])

  return (
    <Dialog {...props}>
      {isPrompt ? (
        <Dialog.Body>
          <Input autoFocus ref={ref} />
        </Dialog.Body>
      ) : null}
      <Dialog.Buttons>
        {isAlert ? null : <Dialog.Cancel onClick={onCancel} />}
        <Dialog.Confirm onClick={onConfirm} />
      </Dialog.Buttons>
    </Dialog>
  )
}

export const DialogProvider = ({ children, fixed = true, portal }) => {
  const [length, setLength] = useState(0)
  const dialogsRef = useRef<
    {
      id: number
      children: ReactNode
    }[]
  >()
  const dialogRef = useRef<DialogContextType>()

  if (!dialogRef.current) {
    let cnt = 0
    const listeners = new Set([setLength])
    const update = (length) => {
      listeners.forEach((fn) => fn(length))
    }

    const dialog = () => {}

    const prompt = (type, props) => {
      return new Promise((resolve) => {
        if (typeof props === 'string') {
          props = {
            title: props,
          }
        }

        const id = dialog.add(
          <Prompt
            {...props}
            type={type}
            onCancel={() => {
              dialog.close(id)
              resolve(false)
            }}
            onConfirm={(value) => {
              dialog.close(id)
              resolve(value)
            }}
          />
        )
      })
    }

    dialog.add = (children) => {
      const id = cnt++

      update(
        dialogsRef.current.push({
          id,
          children,
        })
      )
      return id
    }

    dialog.close = (id) => {
      if (typeof id === 'number') {
        const index = dialogsRef.current.findIndex(
          ({ id: dialogId }) => dialogId === id
        )
        if (index !== -1) {
          dialogsRef.current.splice(index, 1)
          update(dialogsRef.current.length)
        }
      } else {
        dialogsRef.current = []
        update(0)
      }
    }

    dialog.prompt = (props) => prompt('prompt', props)
    dialog.alert = (props) => prompt('alert', props)
    dialog.confirm = (props) => prompt('confirm', props)

    dialog.useAmount = () => {
      const [state, setState] = useState(length)

      useEffect(() => {
        listeners.add(setState)
        return () => {
          listeners.delete(setState)
        }
      }, [])

      return state
    }

    dialogRef.current = dialog
    dialogsRef.current = []
  }

  const dialogs = dialogsRef.current.map(({ id, children }) => {
    return (
      <Backdrop
        key={id}
        css={{
          padding: 20,
          position: fixed ? 'fixed' : 'absolute',
          // cursor: 'pointer',
          // TEMP HACK UNITL WE HAVE PORTAL WORKING
          zIndex: portal ? 999 : null,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
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
  })

  return (
    <DialogContext.Provider value={dialogRef.current}>
      {children}
      {dialogs}
    </DialogContext.Provider>
  )
}
