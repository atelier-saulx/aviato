import { useEffect, useRef } from 'react'
import {
  Page,
  useDialog,
  DialogProvider,
  Dialog,
  Button,
  Input,
  useHasLoaded,
  Text,
} from '@aviato/ui'
import { log } from '@aviato/utils'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const DialogLarge = () => {
  const myLongList = []

  for (let i = 0; i < 1000; i++) {
    myLongList.push(<div key={i}>{i} 🤥</div>)
  }

  return (
    <Dialog>
      <Text color="Secondary">
        This action cannot be undone. This will permanently delete the project{' '}
        <b>Demo</b>, environment <b>Production</b>
      </Text>
      {myLongList}
    </Dialog>
  )
}

const DialogButton = ({ level = 1 }) => {
  const { confirm, alert, prompt, open } = useDialog()

  return (
    <>
      <Button
        leftIcon={<>🤡</>}
        onClick={() => {
          open(<DialogLarge />)
        }}
      >
        HUGE DIALOG
      </Button>

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
        const id = dialog.open(
          <Dialog title="I will dissappear!">Oh noooo!</Dialog>
        )

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
      <DialogProvider>
        <ShowcaseHeader
          title="Dialog"
          description={`
            Show dynamic notifications and alerts to user, part of notifications
            system.
          `}
        />
        <ShowcaseComponent background="transparent">
          <div style={{ maxWidth: '100%' }}>
            <Dialog>Only title</Dialog>

            <br />

            <Dialog>
              <Text color="Primary">Primary Text</Text>
              <Text color="Secondary">
                {' '}
                This action cannot be undone. This will permanently delete the
                project <b>Demo</b>, environment <b>Production</b>
              </Text>
            </Dialog>

            <br />

            <Dialog title="Title">And description</Dialog>

            <br />

            <Dialog title="Title and buttons" padding={0}>
              <Dialog.Buttons border>
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
            <br />
          </div>
        </ShowcaseComponent>
      </DialogProvider>
    </Page>
  )
}

export default DialogPage
