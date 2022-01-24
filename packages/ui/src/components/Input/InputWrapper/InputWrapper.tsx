import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { Text } from '~/components/Text'
import { Conditional } from '~/components/Utilities'
import { IconError } from '~/components/Icons'

const Container = styled('div', {})

const TextContainer = styled('div', {
  paddingBottom: 8,
})

const ErrorContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 8,
})

const IconContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '24px',
  marginRight: 8,
  color: '$ErrorMain',
})

const Error = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$ErrorMain',
})

export interface InputWrapperProps extends ComponentProps<typeof Container> {
  label?: string
  description?: string
  error?: string
}

export const InputWrapper = forwardRef<
  ElementRef<typeof Container>,
  InputWrapperProps
>((properties, forwardRef) => {
  const { label, description, error, children, ...remainingProps } = properties

  const hasLabel = Boolean(label)
  const hasDescription = Boolean(description)
  const hasLabelOrDescription = hasLabel || hasDescription

  return (
    <Container ref={forwardRef} {...remainingProps}>
      <Conditional test={hasLabelOrDescription}>
        <TextContainer>
          <Text weight="semibold">{label}</Text>

          <Text>{description}</Text>
        </TextContainer>
      </Conditional>

      {children}

      <Conditional test={error}>
        <ErrorContainer>
          <IconContainer>
            <IconError />
          </IconContainer>

          <Error>
            <Text color="Inherit">{error}</Text>
          </Error>
        </ErrorContainer>
      </Conditional>
    </Container>
  )
})
