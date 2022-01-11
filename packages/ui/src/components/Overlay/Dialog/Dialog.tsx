import React, { forwardRef, ElementRef, ComponentProps, ReactNode } from 'react'
import { styled } from '~/theme'
import { Text } from '~/components'

const Container = styled('div', {
  width: 520,
  borderRadius: 4,
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
  backgroundColor: '$Background1dp',
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 24,
})

const StyledTitle = styled(Text, {
  marginTop: 24,
})

const StyledBody = styled('div', {
  marginTop: 12,
})

const StyledButtons = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: 24,
})

const Title = ({ children }) => {
  return children ? (
    <StyledTitle weight="semibold">{children}</StyledTitle>
  ) : null
}

const Body = ({ children }) => {
  return children ? <StyledBody>{children}</StyledBody> : null
}

const Buttons = ({ children }) => {
  return children ? <StyledButtons>{children}</StyledButtons> : null
}

export interface DialogProps extends ComponentProps<typeof Container> {
  children?: ReactNode
  title?: string
}

export const Dialog = Object.assign(
  forwardRef<ElementRef<typeof Container>, DialogProps>(
    ({ children, title, ...props }, forwardedRef) => {
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
