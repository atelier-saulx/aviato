import { useEffect, useRef } from 'react'
import {
  Page,
  useDialog,
  DialogProvider,
  Dialog,
  Button,
  Input,
  useHasLoaded,
} from '@aviato/ui'
import { log } from '@aviato/utils'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const DialogButton = ({ level = 1 }) => {
  const { confirm, alert, prompt } = useDialog()

  return (
    <>
      <Button
        onClick={async () => {
          const ok = await confirm('Confirm please')
          log.global.debug('confirm', { ok })
        }}
      >
        Confirm #{level}
      </Button>
      <br />
      <Button
        onClick={async () => {
          await alert('Alert please')
        }}
      >
        Alert #{level}
      </Button>
      <br />
      <Button
        onClick={async () => {
          const name = await prompt('What is your name?')
          log.global.debug('name: ', { name })
        }}
      >
        Prompt #{level}
      </Button>
    </>
  )
}

const DialogButtonAndClose = () => {
  const dialog = useDialog()
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => clearTimeout(timer.current)
  }, [])

  return (
    <Button
      onClick={() => {
        const id = dialog(<Dialog title="I will dissappear!">Oh noooo!</Dialog>)

        timer.current = setTimeout(() => {
          dialog.close(id)
        }, 3000)
      }}
    >
      Open Dialog and close after 3 seconds
    </Button>
  )
}

const DialogPage = () => {
  const hasLoaded = useHasLoaded()

  if (!hasLoaded) {
    return null
  }

  return (
    <Page>
      <DialogProvider portal={document.body}>
        <NextTitle>Dialog</NextTitle>
        <NextText color="Secondary">
          Show dynamic notifications and alerts to user, part of notifications
          system
        </NextText>
        <ShowcaseComponent background="transparent">
          <div style={{ maxWidth: '100%' }}>
            <Dialog>Only title</Dialog>
            <br />
            <Dialog title="Title">And description</Dialog>
            <br />
            <Dialog title="Title and buttons">
              <Dialog.Buttons>
                <Dialog.Cancel />
                <Dialog.Confirm />
              </Dialog.Buttons>
            </Dialog>
            <br />
            <Dialog title="Are you sure you want to permanently delete this content model?">
              <Dialog.Body>This action cannot be undone.</Dialog.Body>
              <Dialog.Buttons>
                <Dialog.Cancel />
                <Dialog.Confirm />
              </Dialog.Buttons>
            </Dialog>
            <br />
            <Dialog title="Subscribe">
              <Dialog.Body>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
                <Input />
              </Dialog.Body>
              <Dialog.Buttons>
                <Dialog.Cancel />
                <Dialog.Confirm />
              </Dialog.Buttons>
            </Dialog>
            <br />
            <Dialog title="Only input">
              <Dialog.Body>
                <Input />
              </Dialog.Body>
              <Dialog.Buttons>
                <Dialog.Cancel />
                <Dialog.Confirm />
              </Dialog.Buttons>
            </Dialog>
          </div>
        </ShowcaseComponent>
        <ShowcaseComponent background="transparent">
          <div>
            <DialogButton />
            <br />
            <DialogButtonAndClose />
          </div>
        </ShowcaseComponent>
      </DialogProvider>
    </Page>
  )
}

export default DialogPage
