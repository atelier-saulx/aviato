import React, { forwardRef, ElementRef, ReactChildren, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'

import { StitchedCSS, styled } from '~/theme'
import { Conditional, Text } from '~/components'
import { IconCheckCircle, IconCloseCircle } from '~/components/Icons'

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
  title?: string
  type?: 'success' | 'error'
  icon?: ReactNode
  css?: StitchedCSS
  children?: ReactChildren | string
}

export const Toast = forwardRef<ElementRef<typeof Container>, ToastProps>(
  (properties, forwardedRef) => {
    const { title, type, icon, children, ...remainingProps } = properties

    const iconMap = {
      success: <SuccessIcon />,
      error: <ErrorIcon />,
    }

    const toastIcon = icon ?? iconMap[type]

    return (
      <Container ref={forwardedRef} {...remainingProps}>
        <Header>
          <Conditional test={toastIcon}>
            <Icon>{toastIcon}</Icon>
          </Conditional>
          <Text weight="semibold">{title}</Text>
        </Header>

        <Text>{children}</Text>
      </Container>
    )
  }
)
