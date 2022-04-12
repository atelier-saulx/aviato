import React, {
  forwardRef,
  ElementRef,
  ComponentProps,
  ReactNode,
  Fragment,
  useRef,
} from 'react'
import { styled } from '~/theme'
import { Text, Button, ScrollArea } from '~/components'
import { useDialog } from './useDialog'
import { useHotkeys } from '~/hooks'

const Container = styled('div', {
  width: 632, // 520
  maxWidth: '100%',
  maxHeight: 'calc(100vh - 32px)', // ??
  display: 'flex', // ??
  borderRadius: 4,
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
  backgroundColor: '$Background1dp',
  '&>div': {
    // need flex to make scrollarea work...  but messes up width
    width: '100%',
  },
  variants: {
    mode: {
      dialog: {
        width: 520,
      },
    },
  },
})

const ScrollBody = styled('div', {
  paddingTop: 24,
  paddingLeft: 24,
  paddingRight: 24,
  width: '100%',
  '&>:last-child': {
    paddingBottom: 24,
  },
})

const StyledButtons = styled('div', {
  position: 'sticky',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingTop: 24,
  backgroundColor: '$Background1dp',
  paddingBottom: 24,
})

const ButtonsWithBorder = styled(StyledButtons, {
  borderTop: '1px solid $OtherDivider',
  marginTop: 48,
  paddingTop: 20,
  paddingLeft: 24,
  paddingRight: 24,
  marginLeft: -24,
  marginRight: -24,
})

const ButtonSpacer = styled('div', {
  width: 16,
})

const BodySpacer = styled('div', {
  height: 24,
  '&:first-child': {
    display: 'none',
  },
})

const Title = ({ children }) => {
  return <Text weight="semibold">{children}</Text>
}

const Body = ({ children }) => {
  if (typeof children === 'string') {
    return <Text css={{ paddingTop: 8 }}>{children}</Text>
  } else if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => (
          <Body key={index}>{child}</Body>
        ))}
      </>
    )
  } else {
    return (
      <>
        <BodySpacer />
        {children}
      </>
    )
  }
}

const Buttons = ({ children, border = null }) => {
  if (Array.isArray(children)) {
    children = children.map((child, index) => {
      return index ? (
        <Fragment key={index}>
          <ButtonSpacer />
          {child}
        </Fragment>
      ) : (
        child
      )
    })
  }
  return border ? (
    <ButtonsWithBorder>{children}</ButtonsWithBorder>
  ) : (
    <StyledButtons>{children}</StyledButtons>
  )
}

const Confirm = ({ children = 'OK', onConfirm, ...props }) => {
  const dialog = useDialog()
  const { current: myId } = useRef(dialog._id)
  const onClick = onConfirm
    ? async () => {
        if (!props.disabled && myId === dialog._id) {
          await onConfirm()
          dialog.close(myId)
        }
      }
    : () => {
        if (!props.disabled && myId === dialog._id) {
          dialog.close(myId)
        }
      }

  useHotkeys([['enter', onClick]])

  return (
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  )
}

const Cancel = ({ children = 'Cancel', onCancel = null, ...props }) => {
  const dialog = useDialog()
  const { current: myId } = useRef(dialog._id)

  const onClick = onCancel
    ? async () => {
        if (!props.disabled && myId === dialog._id) {
          try {
            await onCancel()
            dialog.close(myId)
          } catch (e) {
            console.error(e)
          }
        }
      }
    : () => {
        if (!props.disabled && myId === dialog._id) {
          dialog.close(myId)
        }
      }

  useHotkeys([['escape', onClick]])

  return (
    <Button onClick={onClick} color="action" variant="outline-light" {...props}>
      {children}
    </Button>
  )
}

export interface DialogProps extends ComponentProps<typeof Container> {
  children?: ReactNode
  title?: string
}

export const Dialog = Object.assign(
  forwardRef<ElementRef<typeof Container>, DialogProps>(
    ({ children, title, ...props }, forwardedRef) => {
      if (typeof children === 'string') {
        if (!title) {
          title = children
          children = null
        } else {
          children = <Body>{children}</Body>
        }
      }
      return (
        <Container ref={forwardedRef} {...props}>
          <ScrollArea>
            <ScrollBody>
              <Dialog.Title>{title}</Dialog.Title>
              {children}
            </ScrollBody>
          </ScrollArea>
        </Container>
      )
    }
  ),
  {
    Title,
    Body,
    Buttons,
    Confirm,
    Cancel,
  }
)

Dialog.displayName = 'Dialog'
