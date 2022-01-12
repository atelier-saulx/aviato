import React, {
  forwardRef,
  ElementRef,
  ComponentProps,
  ReactChildren,
  ReactNode,
} from 'react'
import { IconCloseCircle } from '~/icons'
import { styled } from '~/theme'
import { Text } from '../../Text'

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
  flexShrink: 0,
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
  children?: ReactChildren | string
  title?: string
  icon?: ReactNode
}

export const Alert = forwardRef<ElementRef<typeof Container>, AlertProps>(
  (
    { children, title = 'Error', icon = <DefaultIcon />, ...props },
    forwardedRef
  ) => {
    return (
      <Container ref={forwardedRef} {...props}>
        {icon ? <IconColumn>{icon}</IconColumn> : null}
        <TextColumn>
          <Title weight="semibold">{title}</Title>
          <Text>{children}</Text>
        </TextColumn>
      </Container>
    )
  }
)
