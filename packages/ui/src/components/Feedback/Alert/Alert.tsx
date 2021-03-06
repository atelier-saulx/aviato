import React, { forwardRef, ElementRef, ReactChildren, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'

import { IconCloseCircle, IconClose } from '~/components/Icons'
import { StitchedCSS, styled } from '~/theme'
import { Conditional, Text } from '~/components'

const Container = styled('div', {
  position: 'relative',
  backgroundColor: '$ErrorLight',
  borderRadius: 4,
  display: 'flex',
  padding: '0 16px',
  paddingRight: '90px',
  width: '100%',
})

const IconColumn = styled('div', {
  paddingTop: 16,
  paddingBottom: 16,
  paddingRight: 12,
  flexShrink: 0,
})

const TitleCSS: StitchedCSS = {
  paddingBottom: 4,
}

const TextColumn = styled('div', {
  paddingTop: 12,
  paddingBottom: 16,
})

const IconContainer = styled('div', {
  color: '$ErrorMain',
})

const CloseIconContainer = styled('div', {
  cursor: 'pointer',
  color: '$TextPrimary',
})

const CloseIconColumn = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  padding: 16,
})

export interface AlertProps extends ComponentProps<typeof Container> {
  title?: string
  css?: StitchedCSS
  icon?: ReactNode
  closeIcon?: ReactNode
  children?: ReactChildren | string
}

export const Alert = forwardRef<ElementRef<typeof Container>, AlertProps>(
  (properties, forwardedRef) => {
    const {
      children,
      title = 'Error',
      icon = <IconCloseCircle />,
      closeIcon: rightIcon = <IconClose />,
      ...remainingProps
    } = properties

    return (
      <Container ref={forwardedRef} {...remainingProps}>
        <IconColumn>
          <IconContainer>{icon}</IconContainer>
        </IconColumn>

        <TextColumn>
          <Text weight="semibold" css={TitleCSS}>
            {title}
          </Text>
          <Text>{children}</Text>
        </TextColumn>

        <Conditional test={rightIcon}>
          <CloseIconColumn>
            <CloseIconContainer>{rightIcon}</CloseIconContainer>
          </CloseIconColumn>
        </Conditional>
      </Container>
    )
  }
)

Alert.displayName = 'Alert'
