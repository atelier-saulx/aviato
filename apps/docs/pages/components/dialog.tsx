import {
  Page,
  useDialog,
  DialogProvider,
  Dialog,
  Button,
  Input,
} from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'
import { useEffect, useRef } from 'react'

const DialogButton = ({ level = 1 }) => {
  const { confirm, alert, prompt } = useDialog()

  return (
    <>
      <Button
        onClick={async () => {
          const ok = await confirm('Confirm please')
          console.log({ ok })
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
          const name = await prompt('What is your name')
          console.log({ name })
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
          <div>
            <Dialog>Only title</Dialog>
            <br />
            <Dialog title="Title">And description</Dialog>
            <br />
            <Dialog title="Title and buttons">
              <Dialog.Buttons>
                <Button variant="outlined">Cancel</Button>
                <Button>OK</Button>
              </Dialog.Buttons>
            </Dialog>
            <br />
            <Dialog title="Title">
              <Dialog.Body>Description and buttons</Dialog.Body>
              <Dialog.Buttons>
                <Button variant="outlined">Cancel</Button>
                <Button>OK</Button>
              </Dialog.Buttons>
            </Dialog>
            <br />
            <Dialog title="Subscribe">
              <Dialog.Body>
                To subscribe to this website, please neter your email address
                here. We will send updates occasionally.
                <Input />
              </Dialog.Body>
              <Dialog.Buttons>
                <Button variant="outlined">Cancel</Button>
                <Button>OK</Button>
              </Dialog.Buttons>
            </Dialog>
            <br />
            <Dialog title="Only input">
              <Dialog.Body>
                <Input />
              </Dialog.Body>
              <Dialog.Buttons>
                <Button variant="outlined">Cancel</Button>
                <Button>OK</Button>
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
