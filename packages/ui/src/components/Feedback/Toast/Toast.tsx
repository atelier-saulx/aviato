import React, {
  forwardRef,
  ElementRef,
  ComponentProps,
  ReactChildren,
  ReactNode,
} from 'react'

import { styled } from '~/theme'
import { Text } from '~/components'
import { IconCheckCircle, IconCloseCircle } from '~/icons'

const Container = styled('div', {
  width: 400,
  height: 80,
  borderRadius: 4,
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
  backgroundColor: '$Background1dp',
  paddingTop: 12,
  paddingLeft: 16,
  paddingRight: 16,
})

const Header = styled('div', {
  display: 'flex',
  paddingBottom: 4,
  alignItems: 'center',
})

const Icon = styled('div', {
  paddingTop: 4,
  paddingBottom: 4,
  paddingRight: 12,
})

const SuccessIcon = styled(IconCheckCircle, {
  color: '$PrimaryMain',
})

const ErrorIcon = styled(IconCloseCircle, {
  color: '$ErrorMain',
})

export interface ToastProps extends ComponentProps<typeof Container> {
  children?: ReactChildren | string
  title?: string
  icon?: ReactNode
  type?: 'success' | 'error'
}

export const Toast = forwardRef<ElementRef<typeof Container>, ToastProps>(
  ({ children, title, icon, type, ...props }, forwardedRef) => {
    if (type === 'success') {
      icon = <SuccessIcon />
    } else if (type === 'error') {
      icon = <ErrorIcon />
    }
    return (
      <Container ref={forwardedRef} {...props}>
        <Header>
          {icon ? <Icon>{icon}</Icon> : null}
          <Text weight="semibold">{title}</Text>
        </Header>
        <Text>{children}</Text>
      </Container>
    )
  }
)
