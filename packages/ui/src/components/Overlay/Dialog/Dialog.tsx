import React, {
  forwardRef,
  ElementRef,
  ComponentProps,
  ReactNode,
  Fragment,
} from 'react'
import { styled } from '~/theme'
import { Text } from '~/components'

const Container = styled('div', {
  width: 520,
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

const ButtonSpacer = styled('div', {
  width: 16,
})

const BodySpacer = styled('div', {
  height: 16,
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

const Buttons = ({ children }) => {
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
  return <StyledButtons>{children}</StyledButtons>
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
  }
)
