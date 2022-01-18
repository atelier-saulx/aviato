import React, { forwardRef, ElementRef, ReactChildren, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'

import { IconCloseCircle } from '~/components/Icons'
import { StitchedCSS, styled } from '~/theme'
import { Conditional, Text } from '~/components'

const Container = styled('div', {
  backgroundColor: '$ErrorLight',
  borderRadius: 4,
  display: 'flex',
  padding: '0 16px',
  width: '100%',
})

const IconColumn = styled('div', {
  paddingTop: 16,
  paddingBottom: 16,
  paddingRight: 12,
})

const TextColumn = styled('div', {
  paddingTop: 12,
  paddingBottom: 16,
})

const Title = styled(Text, {
  paddingBottom: 4,
})

const DefaultIcon = styled(IconCloseCircle, {
  color: '$ErrorMain',
})

export interface AlertProps extends ComponentProps<typeof Container> {
  title?: string
  icon?: ReactNode
  css?: StitchedCSS
  children?: ReactChildren | string
}

export const Alert = forwardRef<ElementRef<typeof Container>, AlertProps>(
  (properties, forwardedRef) => {
    const {
      children,
      title = 'Error',
      icon = <DefaultIcon />,
      ...remainingProps
    } = properties

    return (
      <Container ref={forwardedRef} {...remainingProps}>
        <Conditional test={icon}>
          <IconColumn>{icon}</IconColumn>
        </Conditional>

        <TextColumn>
          <Title weight="semibold">{title}</Title>
          <Text>{children}</Text>
        </TextColumn>
      </Container>
    )
  }
)
