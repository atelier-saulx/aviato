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
})

const TitleCSS: StitchedCSS = {
  paddingBottom: 4,
}

const TextColumn = styled('div', {
  paddingTop: 12,
  paddingBottom: 16,
})

const DefaultIcon = styled(IconCloseCircle, {
  color: '$ErrorMain',
})

const DefaultRightIcon = styled(IconClose, {
  cursor: 'pointer',
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
      icon = <DefaultIcon />,
      closeIcon: rightIcon = <DefaultRightIcon />,
      ...remainingProps
    } = properties

    return (
      <Container ref={forwardedRef} {...remainingProps}>
        <IconColumn>{icon}</IconColumn>

        <TextColumn>
          <Text weight="semibold" css={TitleCSS}>
            {title}
          </Text>
          <Text>{children}</Text>
        </TextColumn>

        <Conditional test={rightIcon}>
          <CloseIconColumn>{rightIcon}</CloseIconColumn>
        </Conditional>
      </Container>
    )
  }
)
