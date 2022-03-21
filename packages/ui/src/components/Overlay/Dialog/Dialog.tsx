import React, {
  forwardRef,
  ElementRef,
  ComponentProps,
  ReactNode,
  Fragment,
  useRef,
} from 'react'

import { styled } from '~/theme'
import { Text, Button } from '~/components'
import { useDialog } from './useDialog'
import { useHotkeys } from '~/hooks'

const Container = styled('div', {
  width: 632, // 520
  maxWidth: '100%',
  borderRadius: 4,
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
  backgroundColor: '$Background1dp',
  paddingTop: 24,
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 24,
})

const StyledButtons = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingTop: 24,
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
})

const TitleSpacer = styled('div', {
  height: 16,
})

const Title = ({ children }) => {
  return <Text weight="semibold">{children}</Text>
}

const Body = ({ children, index = 0 }) => {
  if (typeof children === 'string') {
    return <Text css={{ paddingTop: 8 }}>{children}</Text>
  } else if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => (
          <Body key={index} index={index}>
            {child}
          </Body>
        ))}
      </>
    )
  } else {
    return (
      <>
        {index ? <BodySpacer /> : <TitleSpacer />}
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
          try {
            await onConfirm()
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
          <Dialog.Title>{title}</Dialog.Title>
          {children}
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
